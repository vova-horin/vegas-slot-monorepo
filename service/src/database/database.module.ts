import { Module } from "@nestjs/common";
import { DatabaseService } from "./database.service";
import { UserRepository } from "./user.repository";
import { GameSessionRepository } from "./game-session.repository";
import { GameRollRepository } from "./game-roll.repository";

@Module({
  providers: [
    DatabaseService,
    UserRepository,
    GameSessionRepository,
    GameRollRepository,
  ],
  exports: [
    DatabaseService,
    UserRepository,
    GameSessionRepository,
    GameRollRepository,
  ],
})
export class DatabaseModule {}
