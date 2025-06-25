import { Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";
import { UserProfileDto } from "./dto/user-profile.dto";

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getUserProfile(userId: string): Promise<UserProfileDto> {
    const user = this.databaseService.user.get(userId);

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return {
      id: user.id,
      gameCredits: user.gameCredits,
      createdAt: user.createdAt,
    };
  }
}
