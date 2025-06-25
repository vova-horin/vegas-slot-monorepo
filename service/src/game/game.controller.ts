import {
  Controller,
  Post,
  Get,
  Param,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { GameService } from "./game.service";
import { SessionResponseDto } from "./dto/session-response.dto";
import { RollResponseDto } from "./dto/roll-response.dto";
import { CashoutResponseDto } from "./dto/cashout-response.dto";
import { User } from "../database/entities/user.entity";

@ApiTags("Game")
@Controller("game")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post("session/start")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Start a new game session" })
  @ApiResponse({
    status: 201,
    description: "Game session started successfully",
    type: SessionResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: "User already has an active session or insufficient credits",
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized",
  })
  async startSession(
    @Request() req: { user: User }
  ): Promise<SessionResponseDto> {
    return this.gameService.startSession(req.user);
  }

  @Post("session/:sessionId/roll")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Pull the slot machine lever (make a roll)" })
  @ApiParam({ name: "sessionId", description: "Game session ID" })
  @ApiResponse({
    status: 200,
    description: "Roll completed successfully",
    type: RollResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: "Insufficient credits to roll",
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized",
  })
  @ApiResponse({
    status: 403,
    description: "Forbidden - You can only roll in your own session",
  })
  @ApiResponse({
    status: 404,
    description: "Active session not found",
  })
  async roll(
    @Param("sessionId") sessionId: string,
    @Request() req: { user: User }
  ): Promise<RollResponseDto> {
    return this.gameService.roll(sessionId, req.user);
  }

  @Post("session/:sessionId/cashout")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Cash out credits from the game session" })
  @ApiParam({ name: "sessionId", description: "Game session ID" })
  @ApiResponse({
    status: 200,
    description: "Cashout completed successfully",
    type: CashoutResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized",
  })
  @ApiResponse({
    status: 403,
    description: "Forbidden - You can only cash out your own session",
  })
  @ApiResponse({
    status: 404,
    description: "Active session not found",
  })
  async cashout(
    @Param("sessionId") sessionId: string,
    @Request() req: { user: User }
  ): Promise<CashoutResponseDto> {
    return this.gameService.cashout(sessionId, req.user);
  }

  @Get("session/:sessionId")
  @ApiOperation({ summary: "Get game session details" })
  @ApiParam({ name: "sessionId", description: "Game session ID" })
  @ApiResponse({
    status: 200,
    description: "Session details retrieved successfully",
    type: SessionResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized",
  })
  @ApiResponse({
    status: 403,
    description: "Forbidden - You can only view your own sessions",
  })
  @ApiResponse({
    status: 404,
    description: "Session not found",
  })
  async getSession(
    @Param("sessionId") sessionId: string,
    @Request() req: { user: User }
  ): Promise<SessionResponseDto> {
    return this.gameService.getSession(sessionId, req.user);
  }

  @Get("session/:sessionId/rolls")
  @ApiOperation({ summary: "Get all rolls for a game session" })
  @ApiParam({ name: "sessionId", description: "Game session ID" })
  @ApiResponse({
    status: 200,
    description: "Rolls retrieved successfully",
    type: [RollResponseDto],
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized",
  })
  @ApiResponse({
    status: 403,
    description: "Forbidden - You can only view your own session rolls",
  })
  @ApiResponse({
    status: 404,
    description: "Session not found",
  })
  async getSessionRolls(
    @Param("sessionId") sessionId: string,
    @Request() req: { user: User }
  ): Promise<RollResponseDto[]> {
    return this.gameService.getSessionRolls(sessionId, req.user);
  }
}
