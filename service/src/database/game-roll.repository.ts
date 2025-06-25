import { Injectable } from "@nestjs/common";
import { GameRoll, RollSymbol } from "./entities/game-roll.entity";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class GameRollRepository {
  private rolls: Map<string, GameRoll> = new Map();

  create(
    sessionId: string,
    symbols: RollSymbol[],
    isWin: boolean,
    reward: number,
    creditsBefore: number,
    creditsAfter: number,
    wasRerolled: boolean = false
  ): GameRoll {
    const id = uuidv4();
    const roll = new GameRoll(
      id,
      sessionId,
      symbols,
      isWin,
      reward,
      creditsBefore,
      creditsAfter,
      wasRerolled
    );
    this.rolls.set(id, roll);
    return roll;
  }

  findBySessionId(sessionId: string): GameRoll[] {
    const sessionRolls: GameRoll[] = [];
    for (const roll of this.rolls.values()) {
      if (roll.sessionId === sessionId) {
        sessionRolls.push(roll);
      }
    }
    return sessionRolls.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  findById(id: string): GameRoll | null {
    return this.rolls.get(id) || null;
  }
}
