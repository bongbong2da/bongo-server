import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class BusCrewsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationsService: NotificationsService,
  ) {}

  async enterBus(busId: number, userId: number) {
    const user = await this.prisma.users.findUnique({
      where: {
        id: userId,
      },
    });

    const targetBus = await this.prisma.buses.findUnique({
      where: {
        id: busId,
      },
      include: {
        users: true,
        busCrews: true,
      },
    });

    if (!targetBus) {
      throw new NotFoundException(`Bus with id ${busId} not found`);
    }

    const isAlreadyCrew = targetBus.busCrews.some(
      (busCrew) => busCrew.userId === userId,
    );

    if (isAlreadyCrew) {
      throw new NotFoundException(`User with id ${userId} is already a crew`);
    }

    // Send notification to the bus owner
    this.notificationsService.sendNotification({
      userId: targetBus.users.id,
      message: `${user.username}님이 버스에 탑승했습니다.`,
    });

    const createCrewResult = await this.prisma.busCrews.create({
      data: {
        buses: {
          connect: {
            id: busId,
          },
        },
        users: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return this.prisma.buses.findUnique({
      where: {
        id: busId,
      },
      include: {
        busCrews: true,
      },
    });
  }

  async exitBus(busCrewId: number, userId: number) {
    const user = await this.prisma.users.findUnique({
      where: {
        id: userId,
      },
    });

    const targetBusCrew = await this.prisma.busCrews.findUnique({
      where: {
        id: busCrewId,
      },
      include: {
        buses: {
          include: {
            users: true,
          },
        },
        users: true,
      },
    });

    console.log(targetBusCrew);

    const isSameUser = targetBusCrew.users.id === userId;

    if (!isSameUser) {
      throw new NotFoundException(`User with id ${userId} is not the crew`);
    }

    await this.prisma.busCrews.delete({
      where: {
        id: busCrewId,
      },
    });

    // Send notification to the bus owner
    this.notificationsService.sendNotification({
      userId: targetBusCrew.buses.users.id,
      message: `${user.username}님이 버스에서 내렸습니다.`,
    });

    if (!targetBusCrew) {
      throw new NotFoundException(`Bus Crew with id ${busCrewId} not found`);
    }

    return true;
  }

  async getCrews(busId: number) {
    const targetBus = await this.prisma.buses.findUnique({
      where: {
        id: busId,
      },
      include: {
        busCrews: true,
      },
    });

    if (!targetBus) {
      throw new NotFoundException(`Bus with id ${busId} not found`);
    }

    return targetBus.busCrews;
  }

  async kickBusCrew(busCrewId: number, userId: number) {
    const targetBusCrew = await this.prisma.busCrews.delete({
      where: {
        id: busCrewId,
        users: {
          id: userId,
        },
      },
      include: {
        buses: {
          include: {
            users: true,
          },
        },
      },
    });

    if (!targetBusCrew) {
      throw new NotFoundException(`Bus Crew with id ${busCrewId} not found`);
    }

    const isOwner = targetBusCrew.buses.users.id === userId;

    if (!isOwner) {
      throw new NotFoundException(`Kicking bus crew is not allowed`);
    }

    // Send notification to the kicked user
    this.notificationsService.sendNotification({
      userId: targetBusCrew.userId,
      message: `${targetBusCrew.buses.title}에서 추방당했습니다.`,
    });

    return true;
  }
}
