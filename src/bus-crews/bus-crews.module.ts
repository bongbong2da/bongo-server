import { Module } from '@nestjs/common';
import { BusCrewsService } from './bus-crews.service';
import { BusCrewsController } from './bus-crews.controller';
import { PrismaService } from '../prisma.service';
import { NotificationsService } from '../notifications/notifications.service';

@Module({
  controllers: [BusCrewsController],
  providers: [BusCrewsService, PrismaService, NotificationsService],
})
export class BusCrewsModule {}
