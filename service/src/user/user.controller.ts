import { Controller, Get, UseGuards, Request } from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { UserService } from "./user.service";
import { UserProfileDto } from "./dto/user-profile.dto";

@ApiTags("Users")
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("me")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Get current user profile",
    description: "Returns the profile of the authenticated user",
  })
  @ApiResponse({
    status: 200,
    description: "User profile retrieved successfully",
    type: UserProfileDto,
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized - Invalid or missing JWT token",
  })
  async getMe(@Request() req): Promise<UserProfileDto> {
    return this.userService.getUserProfile(req.user.id);
  }
}
