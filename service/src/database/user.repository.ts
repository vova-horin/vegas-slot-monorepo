import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { v4 as uuidv4 } from "uuid";
import { User } from "./entities/user.entity";

@Injectable()
export class UserRepository {
  private users: Map<string, User> = new Map();

  constructor(private configService: ConfigService) {}

  create(): User {
    const userId = uuidv4();
    const defaultCredits = this.configService.get(
      "app.game.defaultUserCredits"
    );
    const user = new User(userId, defaultCredits);
    this.users.set(user.id, user);
    return user;
  }

  get(userId: string): User | undefined {
    return this.users.get(userId);
  }

  update(userId: string, updates: Partial<User>): User | undefined {
    const user = this.users.get(userId);
    if (!user) return undefined;

    Object.assign(user, updates);
    user.updatedAt = new Date();
    this.users.set(userId, user);
    return user;
  }
}
