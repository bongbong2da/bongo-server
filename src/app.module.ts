import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BusesModule } from './buses/buses.module';
import { UserTokensModule } from './user-tokens/user-tokens.module';
import { FriendshipsModule } from './friendships/friendships.module';
import { BusCrewsModule } from './bus-crews/bus-crews.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    UsersModule,
    BusesModule,
    UserTokensModule,
    FriendshipsModule,
    BusCrewsModule,
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
