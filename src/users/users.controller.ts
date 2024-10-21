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
import { UsersService } from './users.service';
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({
    operationId: 'createUser',
    summary: '사용자 생성',
    description: '사용자를 생성합니다.',
  })
  @ApiResponse({
    status: 201,
    description: '사용자 생성 성공',
  })
  @ApiBody({
    type: CreateUsersDto,
    required: true,
    description: '사용자 정보',
  })
  create(@Body() createUserDto: CreateUsersDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({
    operationId: 'getUsers',
    summary: '사용자 목록 조회',
    description: '사용자 목록을 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '사용자 목록 조회 성공',
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
    return this.usersService.findAll({ page, size });
  }

  @Get(':userId')
  @ApiOperation({
    operationId: 'getUser',
    summary: '사용자 조회',
    description: '사용자를 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '사용자 조회',
  })
  @ApiQuery({
    name: 'userId',
    description: '사용자 ID',
    required: true,
    type: Number,
  })
  findOne(@Param('userId', ParseIntPipe) userId: number) {
    return this.usersService.findOne(userId);
  }

  @Patch(':userId')
  @ApiOperation({
    operationId: 'updateUser',
    summary: '사용자 수정',
    description: '사용자를 수정합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '사용자 수정 성공',
  })
  @ApiQuery({
    name: 'userId',
    description: '사용자 ID',
    required: true,
    type: Number,
  })
  update(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() updateUserDto: UpdateUsersDto,
  ) {
    return this.usersService.update(userId, updateUserDto);
  }

  @Delete(':userId')
  @ApiOperation({
    operationId: 'removeUser',
    summary: '사용자 삭제',
    description: '사용자를 삭제합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '사용자 삭제 성공',
  })
  @ApiQuery({
    name: 'userId',
    description: '사용자 ID',
    required: true,
    type: Number,
  })
  remove(@Param('userId', ParseIntPipe) userId: number) {
    return this.usersService.remove(userId);
  }
}
