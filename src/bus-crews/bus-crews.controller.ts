import {
  Controller,
  Delete,
  Get,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { BusCrewsService } from './bus-crews.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateBusCrewsDto } from './dto/create-bus-crews.dto';
import { BusesDto } from '../buses/dto/buses.dto';
import { BusCrewsDto } from './dto/bus-crews.dto';

@Controller('bus-crews')
@ApiTags('bus-crews')
export class BusCrewsController {
  constructor(private readonly busCrewsService: BusCrewsService) {}

  @Post('/bus/:busId')
  @ApiOperation({
    operationId: 'createBusCrew',
    summary: '승무원 등록',
    description: '승무원을 등록합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '승무원 등록 성공',
    type: BusesDto,
  })
  @ApiBody({
    type: CreateBusCrewsDto,
    required: true,
    description: '승무원 정보',
  })
  enterBus(@Query('busId') busId: number) {
    return this.busCrewsService.enterBus(busId, 1);
  }

  @Delete('/:busCrewId')
  @ApiOperation({
    operationId: 'deleteBusCrew',
    summary: '승무원 삭제',
    description: '승무원을 삭제합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '승무원 삭제 성공',
    type: Boolean,
  })
  @ApiBody({
    type: BusCrewsDto,
    required: true,
    description: '승무원 정보',
  })
  exitBus(@Query('busCrewId', ParseIntPipe) busCrewId: number) {
    return this.busCrewsService.exitBus(busCrewId, 1);
  }

  @Get('/bus/:busId')
  @ApiOperation({
    operationId: 'getBusCrews',
    summary: '버스의 승무원 조회',
    description: '특정 버스의 승무원을 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '승무원 조회 성공',
    type: [BusCrewsDto],
  })
  getCrews(@Query('busId') busId: number) {
    return this.busCrewsService.getCrews(busId);
  }

  @Delete('/kick/:busCrewId')
  @ApiOperation({
    operationId: 'kickBusCrew',
    summary: '승무원 추방',
    description: '승무원을 추방합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '승무원 추방 성공',
    type: Boolean,
  })
  @ApiBody({
    type: BusCrewsDto,
    required: true,
    description: '승무원 정보',
  })
  kickBusCrew(@Query('busCrewId', ParseIntPipe) busCrewId: number) {
    return this.busCrewsService.kickBusCrew(busCrewId, 1);
  }
}
