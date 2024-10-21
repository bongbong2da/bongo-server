import {
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FriendshipsService } from './friendships.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import AuthGuard from '../guards/AuthGuard';

@Controller('friendships')
@ApiTags('friendships')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class FriendshipsController {
  constructor(private readonly friendshipsService: FriendshipsService) {}

  @Post(':targetUserId')
  @ApiOperation({
    operationId: 'createFriendship',
    summary: '친구 추가',
    description: '친구를 추가합니다.',
  })
  @ApiParam({
    name: 'targetUserId',
    description: '유저 아이디',
    required: true,
    type: Number,
  })
  create(
    @Req() req,
    @Param('targetUserId', ParseIntPipe) targetUserId: number,
  ) {
    console.log(req);
    const userId = req.user.sub;
    return this.friendshipsService.create(userId, targetUserId);
  }

  @Get()
  @ApiOperation({
    operationId: 'getFriends',
    summary: '친구 목록 조회',
    description: '친구 목록을 조회합니다.',
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
  getFriends(
    @Req() req,
    @Query('page', new DefaultValuePipe(0)) page: number,
    @Query('size', new DefaultValuePipe(10)) size: number,
  ) {
    const userId = req.user.sub;
    return this.friendshipsService.getFriends(userId, { page, size });
  }

  @Delete(':targetUserId')
  @ApiOperation({
    operationId: 'deleteFriendship',
    summary: '친구 삭제',
    description: '친구를 삭제합니다.',
  })
  @ApiParam({
    name: 'targetUserId',
    description: '유저 아이디',
    required: true,
    type: Number,
  })
  remove(
    @Req() req,
    @Param('targetUserId', ParseIntPipe) targetUserId: number,
  ) {
    const userId = req.user.sub;
    return this.friendshipsService.removeFriendship(userId, targetUserId);
  }
}
