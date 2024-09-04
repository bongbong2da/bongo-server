import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";

@Controller('auth')
@ApiTags("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('ka"kakao-login" async kakaoLogin(@Body() body: CreateSocialUsersDto) {
    return await this.authService.kakaoSignIn(body);
  }

  @Post('re"refresh-token" async refreshToken(
    @Body() body: { accessToken: string; refreshToken: string },
 ) {
    return await this.authService.refreshToken(body);
  }
}
