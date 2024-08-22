import { Module } from '@nestjs/common';
import { BusCrewsService } from './bus-crews.service';
import { BusCrewsController } from './bus-crews.controller';

@Module({
  controllers: [BusCrewsController],
  providers: [BusCrewsService],
})
export class BusCrewsModule {}
