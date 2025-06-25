import { Injectable } from "@nestjs/common";
import { GameSession } from "./entities/game-session.entity";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class GameSessionRepository {
  private sessions: Map<string, GameSession> = new Map();

  create(userId: string, credits: number = 10): GameSession {
    const id = uuidv4();
    const session = new GameSession(id, userId, credits);
    this.sessions.set(id, session);
    return session;
  }

  findById(id: string): GameSession | null {
    return this.sessions.get(id) || null;
  }

  findUserActiveSession(userId: string): GameSession | null {
    for (const session of this.sessions.values()) {
      if (session.userId === userId && session.isActive) {
        return session;
      }
    }
    return null;
  }

  closeSession(id: string): void {
    const session = this.sessions.get(id);
    if (session) {
      session.isActive = false;
      session.updatedAt = new Date();
      this.sessions.set(id, session);
    }
  }
}
