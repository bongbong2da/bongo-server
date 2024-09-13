import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateSocialUsersDto } from '../social-users/dto/create-social-users.dto';

class Tokens {
  @ApiProperty({
    type: 'string',
  })
  accessToken: string;
  @ApiProperty({
    type: 'string',
  })
  refreshToken: string;
}

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('kakao-login')
  @ApiOperation({
    operationId: 'kakaoLogin',
    description: '카카오에서 취득한 정보로 로그인합니다.',
    summary: '카카오를 통한 로그인',
  })
  @ApiBody({
    type: CreateSocialUsersDto,
  })
  async kakaoLogin(@Body() body: CreateSocialUsersDto) {
    return await this.authService.kakaoSignIn(body);
  }

  @Post('refresh-token')
  @ApiOperation({
    operationId: 'refreshToken',
    description: '토큰을 갱신합니다.',
    summary: '토큰 갱신',
  })
  @ApiBody({
    type: Tokens,
  })
  async refreshToken(
    @Body() body: { accessToken: string; refreshToken: string },
  ) {
    return await this.authService.refreshToken(body);
  }
}
