import { Module } from '@nestjs/common';
import { BusesService } from './buses.service';
import { BusesController } from './buses.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [BusesController],
  providers: [BusesService, PrismaService],
})
export class BusesModule {}
