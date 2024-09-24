import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class BusCrewsService {
  constructor(private readonly prisma: PrismaService) {}

  async enterBus(busId: number, userId: number) {
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
    const targetBusCrew = await this.prisma.busCrews.delete({
      where: {
        id: busCrewId,
        users: {
          id: userId,
        },
      },
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
        buses: true,
      },
    });

    if (targetBusCrew.buses.id !== userId) {
      throw new NotFoundException(`Kicking bus crew is not allowed`);
    }

    if (!targetBusCrew) {
      throw new NotFoundException(`Bus Crew with id ${busCrewId} not found`);
    }

    return true;
  }
}
