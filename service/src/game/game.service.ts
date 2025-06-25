import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { GameSessionRepository } from "../database/game-session.repository";
import { GameRollRepository } from "../database/game-roll.repository";
import { UserRepository } from "../database/user.repository";
import { RollSymbol } from "../database/entities/game-roll.entity";
import { User } from "../database/entities/user.entity";
import { SessionResponseDto } from "./dto/session-response.dto";
import { RollResponseDto } from "./dto/roll-response.dto";
import { CashoutResponseDto } from "./dto/cashout-response.dto";
import { CheatingConfig } from "../config/app.config";

@Injectable()
export class GameService {
  constructor(
    private readonly gameSessionRepository: GameSessionRepository,
    private readonly gameRollRepository: GameRollRepository,
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService
  ) {}

  async startSession(user: User): Promise<SessionResponseDto> {
    const existingSession = this.gameSessionRepository.findUserActiveSession(
      user.id
    );
    if (existingSession) {
      throw new BadRequestException("User already has an active session");
    }

    const sessionStartingCredits = this.configService.get(
      "app.game.sessionStartingCredits"
    );

    if (user.gameCredits < sessionStartingCredits) {
      throw new BadRequestException("Insufficient credits to start session");
    }

    this.userRepository.update(user.id, {
      gameCredits: user.gameCredits - sessionStartingCredits,
    });

    const session = this.gameSessionRepository.create(
      user.id,
      sessionStartingCredits
    );

    return {
      sessionId: session.id,
      credits: session.credits,
      isActive: session.isActive,
      createdAt: session.createdAt,
    };
  }

  async roll(sessionId: string, user: User): Promise<RollResponseDto> {
    const session = this.gameSessionRepository.findById(sessionId);
    if (!session || !session.isActive) {
      throw new NotFoundException("Active session not found");
    }

    if (session.userId !== user.id) {
      throw new ForbiddenException("You can only roll in your own session");
    }

    if (session.credits < 1) {
      throw new BadRequestException("Insufficient credits to roll");
    }

    const creditsBefore = session.credits;
    session.credits -= 1;

    let { symbols, isWin, reward } = this.performRoll();
    let wasRerolled = false;

    const cheatingConfig = this.configService.get("app.game.cheating");
    const shouldReroll =
      isWin &&
      cheatingConfig.enabled &&
      this.shouldReroll(session.credits, cheatingConfig);

    if (shouldReroll) {
      wasRerolled = true;
      ({ symbols, isWin, reward } = this.performRoll());
    }

    if (isWin) {
      session.credits += reward;
    }

    const roll = this.gameRollRepository.create(
      sessionId,
      symbols,
      isWin,
      reward,
      creditsBefore,
      session.credits,
      wasRerolled
    );

    return {
      rollId: roll.id,
      symbols: roll.symbols,
      isWin: roll.isWin,
      reward: roll.reward,
      creditsBefore: roll.creditsBefore,
      creditsAfter: roll.creditsAfter,
      createdAt: roll.createdAt,
    };
  }

  async cashout(sessionId: string, user: User): Promise<CashoutResponseDto> {
    const session = this.gameSessionRepository.findById(sessionId);
    if (!session || !session.isActive) {
      throw new NotFoundException("Active session not found");
    }

    if (session.userId !== user.id) {
      throw new ForbiddenException("You can only cash out your own session");
    }

    const cashedOutCredits = session.credits;

    this.gameSessionRepository.closeSession(sessionId);
    this.userRepository.update(user.id, {
      gameCredits: user.gameCredits + cashedOutCredits,
    });

    return {
      sessionId: session.id,
      cashedOutCredits,
      cashedOutAt: new Date(),
    };
  }

  async getSession(sessionId: string, user: User): Promise<SessionResponseDto> {
    const session = this.gameSessionRepository.findById(sessionId);
    if (!session) {
      throw new NotFoundException("Session not found");
    }

    if (session.userId !== user.id) {
      throw new ForbiddenException("You can only view your own sessions");
    }

    return {
      sessionId: session.id,
      credits: session.credits,
      isActive: session.isActive,
      createdAt: session.createdAt,
    };
  }

  async getSessionRolls(
    sessionId: string,
    user: User
  ): Promise<RollResponseDto[]> {
    const session = this.gameSessionRepository.findById(sessionId);
    if (!session) {
      throw new NotFoundException("Session not found");
    }

    if (session.userId !== user.id) {
      throw new ForbiddenException("You can only view your own session rolls");
    }

    const rolls = this.gameRollRepository.findBySessionId(sessionId);
    return rolls.map((roll) => ({
      rollId: roll.id,
      symbols: roll.symbols,
      isWin: roll.isWin,
      reward: roll.reward,
      creditsBefore: roll.creditsBefore,
      creditsAfter: roll.creditsAfter,
      createdAt: roll.createdAt,
    }));
  }

  private generateRandomSymbols(count: number): RollSymbol[] {
    const symbols = Object.values(RollSymbol);
    const result: RollSymbol[] = [];

    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * symbols.length);
      result.push(symbols[randomIndex]);
    }

    return result;
  }

  private checkWin(symbols: RollSymbol[]): boolean {
    return symbols[0] === symbols[1] && symbols[1] === symbols[2];
  }

  private performRoll(): {
    symbols: RollSymbol[];
    isWin: boolean;
    reward: number;
  } {
    const symbolsCount = this.configService.get("app.game.symbolsCount");
    const symbolRewards = this.configService.get("app.game.symbolRewards");

    const symbols = this.generateRandomSymbols(symbolsCount);
    const isWin = this.checkWin(symbols);
    const reward = isWin ? symbolRewards[symbols[0]] : 0;
    return { symbols, isWin, reward };
  }

  private shouldReroll(
    credits: number,
    cheatingConfig: CheatingConfig
  ): boolean {
    const applicableThresholds = cheatingConfig.thresholds.filter(
      (threshold) => credits >= threshold.balance
    );

    if (applicableThresholds.length === 0) {
      return false;
    }

    const maxChance = Math.max(
      ...applicableThresholds.map((t) => t.rerollChance)
    );

    return Math.random() < maxChance;
  }
}
