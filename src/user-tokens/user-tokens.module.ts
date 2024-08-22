import { Module } from '@nestjs/common';
import { UserTokensService } from './user-tokens.service';
import { UserTokensController } from './user-tokens.controller';

@Module({
  controllers: [UserTokensController],
  providers: [UserTokensService],
})
export class UserTokensModule {}
