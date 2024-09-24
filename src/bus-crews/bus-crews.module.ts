import { Module } from '@nestjs/common';
import { BusCrewsService } from './bus-crews.service';
import { BusCrewsController } from './bus-crews.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [BusCrewsController],
  providers: [BusCrewsService, PrismaService],
})
export class BusCrewsModule {}
