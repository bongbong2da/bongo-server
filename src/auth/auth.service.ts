import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateSocialUsersDto } from '../social-users/dto/create-social-users.dto';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Users } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    readonly prisma: PrismaService,
    readonly jwt: JwtService,
  ) {}

  async kakaoSignIn(createSocialUser: CreateSocialUsersDto) {
    const socialUser = await this.prisma.socialUsers.findUnique({
      where: {
        socialId: String(createSocialUser.socialId),
      },
    });

    if (socialUser) {
      const user = await this.prisma.users.findUnique({
        where: {
          id: socialUser.userId,
        },
      });
      const accessToken = this.jwt.sign({ sub: user.id }, { expiresIn: '1d' });
      const refreshToken = this.jwt.sign({ sub: user.id }, { expiresIn: '7d' });
      this.saveUserTokens(user, { accessToken, refreshToken });
      return { accessToken, refreshToken };
    } else {
      const user = await this.prisma.users.create({
        data: {
          email: createSocialUser.email,
          username: createSocialUser.nickname,
          password: null,
          socialUsers: {
            create: {
              socialId: String(createSocialUser.socialId),
              provider: 'kakao',
              nickname: createSocialUser.nickname,
            },
          },
        },
      });
      const accessToken = this.jwt.sign({ sub: user.id }, { expiresIn: '1d' });
      const refreshToken = this.jwt.sign({ sub: user.id }, { expiresIn: '7d' });
      this.saveUserTokens(user, { accessToken, refreshToken });
      return { accessToken, refreshToken };
    }
  }

  async saveUserTokens(
    user: Users,
    tokens: { accessToken: string; refreshToken: string },
  ) {
    await this.prisma.userTokens.create({
      data: {
        ...tokens,
        accessExpiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
        refreshExpiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        users: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  }

  async refreshToken(tokens: { accessToken: string; refreshToken: string }) {
    const isValidRefreshToken = this.jwt.verify(tokens.refreshToken);

    if (!isValidRefreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const newAccessToken = this.jwt.sign(
      { sub: isValidRefreshToken.sub },
      { expiresIn: '1d' },
    );
    return { accessToken: newAccessToken, refreshToken: tokens.refreshToken };
  }
}
