import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { DatabaseService } from "../database/database.service";
import { User } from "../database/entities";
import { AuthResponseDto } from "./dto/auth-response.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService
  ) {}

  async signUp(): Promise<AuthResponseDto> {
    const user = this.databaseService.user.create();
    const accessToken = this.generateAccessToken(user);
    return {
      accessToken,
    };
  }

  async validateUser(userId: string): Promise<User | null> {
    return this.databaseService.user.get(userId) || null;
  }

  private generateAccessToken(user: User): string {
    const payload = { sub: user.id };
    return this.jwtService.sign(payload);
  }
}
