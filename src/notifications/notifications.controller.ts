import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import AuthGuard from '../guards/AuthGuard';
import { Notifications } from './entities/notifications.entity';

@Controller('notifications')
@ApiTags('notifications')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  @ApiOperation({
    operationId: 'getNotifications',
    summary: '알림 목록 조회',
    description: '알림 목록을 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    type: [Notifications],
    description: '읽음 처리 성공',
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
  getNotifications(
    @Req() req,
    @Query('page', new DefaultValuePipe(0)) page: number,
    @Query('size', new DefaultValuePipe(10)) size: number,
  ) {
    const userId = req.user.sub;
    return this.notificationsService.getNotifications(userId, { page, size });
  }

  @Post('read-all')
  @ApiOperation({
    operationId: 'readAllNotifications',
    summary: '모든 알림 읽음 처리',
    description: '모든 알림을 읽음 처리합니다.',
  })
  readAllNotifications(@Req() req) {
    const userId = req.user.sub;
    return this.notificationsService.readAllNotifications(userId);
  }

  @Post(':notificationId/read')
  @ApiOperation({
    operationId: 'readNotification',
    summary: '알림 읽음 처리',
    description: '알림을 읽음 처리합니다.',
  })
  @ApiQuery({
    name: 'notificationId',
    description: '알림 아이디',
    required: true,
    type: Number,
  })
  readNotification(
    @Req() req,
    @Query('notificationId', ParseIntPipe) notificationId: number,
  ) {
    const userId = req.user.sub;
    return this.notificationsService.readNotification(userId, notificationId);
  }

  @Post(':notificationId/delete')
  @ApiOperation({
    operationId: 'deleteNotification',
    summary: '알림 삭제',
    description: '알림을 삭제합니다.',
  })
  @ApiQuery({
    name: 'notificationId',
    description: '알림 아이디',
    required: true,
    type: Number,
  })
  deleteNotification(
    @Req() req,
    @Query('notificationId', ParseIntPipe) notificationId: number,
  ) {
    const userId = req.user.sub;
    return this.notificationsService.deleteNotification(userId, notificationId);
  }
}
