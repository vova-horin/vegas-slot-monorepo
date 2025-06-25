import { Controller, Post, HttpCode, HttpStatus } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { AuthResponseDto } from "./dto/auth-response.dto";

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("sign-up")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "Sign up new user",
    description: "Creates a new user session and returns JWT token",
  })
  @ApiResponse({
    status: 201,
    description: "User created successfully",
    type: AuthResponseDto,
  })
  async signUp(): Promise<AuthResponseDto> {
    return this.authService.signUp();
  }
}
