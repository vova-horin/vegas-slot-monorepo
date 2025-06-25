import { Controller, Get, UseGuards, Request } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { UserService } from "./user.service";
import { UserProfileDto } from "./dto/user-profile.dto";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("me")
  @UseGuards(JwtAuthGuard)
  async getMe(@Request() req): Promise<UserProfileDto> {
    return this.userService.getUserProfile(req.user.id);
  }
}
