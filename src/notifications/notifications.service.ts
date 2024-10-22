import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { makePagination } from '../utils/PaginationUtil';

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  async getNotifications(
    userId: number,
    params: { page: number; size: number },
  ) {
    try {
      const notifications = await this.prisma.notifications.findMany({
        where: {
          userId,
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip: params.page * params.size,
        take: params.size,
      });

      const totalCount = await this.prisma.notifications.count({
        where: {
          userId,
        },
      });

      const pagination = makePagination({
        page: params.page,
        size: params.size,
        totalCount,
      });

      return {
        notifications,
        meta: pagination,
      };
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async readAllNotifications(userId: number) {
    try {
      await this.prisma.notifications.updateMany({
        where: {
          userId,
          isRead: false,
        },
        data: {
          isRead: true,
        },
      });

      return true;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async readNotification(userId: number, id: number) {
    try {
      const notification = await this.prisma.notifications.findFirst({
        where: {
          id,
          userId,
        },
      });

      if (!notification) {
        throw new NotFoundException('Notification not found');
      }

      await this.prisma.notifications.update({
        where: {
          id,
        },
        data: {
          isRead: true,
        },
      });

      return true;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async deleteNotification(userId: number, id: number) {
    try {
      const notification = await this.prisma.notifications.findFirst({
        where: {
          id,
          userId,
        },
      });

      if (!notification) {
        throw new NotFoundException('Notification not found');
      }

      await this.prisma.notifications.delete({
        where: {
          id,
        },
      });

      return true;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  sendNotification(params: { userId: number; message: string; link?: string }) {
    try {
      const sendNotificationResult = this.prisma.notifications
        .create({
          data: {
            users: {
              connect: {
                id: params.userId,
              },
            },
            message: params.message,
            isRead: false,
          },
        })
        .then((result) => {
          console.log(result);
          return result;
        });
    } catch (e) {
      console.log(e);
    }
  }
}
