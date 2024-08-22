import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BusCrewsService } from './bus-crews.service';
import { CreateBusCrewDto } from './dto/create-bus-crew.dto';
import { UpdateBusCrewDto } from './dto/update-bus-crew.dto';

@Controller('bus-crews')
export class BusCrewsController {
  constructor(private readonly busCrewsService: BusCrewsService) {}

  @Post()
  create(@Body() createBusCrewDto: CreateBusCrewDto) {
    return this.busCrewsService.create(createBusCrewDto);
  }

  @Get()
  findAll() {
    return this.busCrewsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.busCrewsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBusCrewDto: UpdateBusCrewDto) {
    return this.busCrewsService.update(+id, updateBusCrewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.busCrewsService.remove(+id);
  }
}
