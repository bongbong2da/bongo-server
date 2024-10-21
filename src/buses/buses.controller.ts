import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { BusesService } from './buses.service';
import { CreateBusesDto } from './dto/create-buses.dto';
import { UpdateBusesDto } from './dto/update-buses.dto';
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BusesDto } from './dto/buses.dto';

@Controller('buses')
@ApiTags('buses')
export class BusesController {
  constructor(private readonly busesService: BusesService) {}

  @Post()
  @ApiOperation({
    operationId: 'createBus',
    summary: '버스 배차',
    description: '버스를 배차합니다.',
  })
  @ApiBody({
    type: CreateBusesDto,
    required: true,
    description: '버스 배차 정보',
  })
  create(@Body() createBusDto: CreateBusesDto) {
    return this.busesService.create(createBusDto);
  }

  @Get()
  @ApiOperation({
    operationId: 'getBuses',
    summary: '배차된 버스 목록 조회',
    description: '배차된 버스 목록을 조회합니다.',
  })
  @ApiResponse({
    type: [BusesDto],
    status: 200,
    description: '배차된 버스 목록 조회 성공',
  })
  @ApiQuery({
    name: 'page',
    description: '페이지 번호',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'size',
    description: '페이지 크기',
    required: false,
    type: Number,
  })
  findAll(
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
    @Query('size', new DefaultValuePipe(10), ParseIntPipe) size: number,
  ) {
    return this.busesService.findAll({ page, size });
  }

  @Get(':busId')
  @ApiOperation({
    operationId: 'getBus',
    summary: '배차된 버스 조회',
    description: '배차된 버스를 조회합니다.',
  })
  @ApiResponse({
    type: BusesDto,
    status: 200,
    description: '배차된 버스 조회 성공',
  })
  @ApiQuery({
    name: 'id',
    description: '버스 ID',
    required: true,
    type: Number,
  })
  findOne(@Param('busId', ParseIntPipe) busId: string) {
    return this.busesService.findOne(+busId);
  }

  @Patch(':busId')
  @ApiOperation({
    operationId: 'updateBus',
    summary: '배차된 버스 수정',
    description: '배차된 버스를 수정합니다.',
  })
  @ApiResponse({
    type: BusesDto,
    status: 200,
    description: '배차된 버스 수정 성공',
  })
  @ApiQuery({
    name: 'id',
    description: '버스 ID',
    required: true,
    type: Number,
  })
  @ApiBody({
    type: UpdateBusesDto,
    required: true,
    description: '수정할 버스 정보',
  })
  update(
    @Param('busId', ParseIntPipe) busId: number,
    @Body() updateBusDto: UpdateBusesDto,
  ) {
    return this.busesService.update(busId, updateBusDto);
  }

  @Delete(':busId')
  @ApiOperation({
    operationId: 'removeBus',
    summary: '배차된 버스 삭제',
    description: '배차된 버스를 삭제합니다.',
  })
  @ApiResponse({
    type: Boolean,
    status: 200,
    description: '배차된 버스 삭제 성공',
  })
  @ApiQuery({
    name: 'id',
    description: '버스 ID',
    required: true,
    type: Number,
  })
  remove(@Param('busId', ParseIntPipe) busId: number) {
    return this.busesService.remove(busId);
  }
}
