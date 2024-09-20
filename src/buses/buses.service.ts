import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateBusesDto } from './dto/create-buses.dto';
import { UpdateBusesDto } from './dto/update-buses.dto';
import { makePagination } from '../utils/PaginationUtil';

@Injectable()
export class BusesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBusDto: CreateBusesDto) {
    return this.prisma.buses.create({
      data: {
        ...createBusDto,
        users: {
          connect: {
            id: 1,
          },
        },
      },
    });
  }

  async findAll(params: { page: number; size: number }) {
    const buses = await this.prisma.buses.findMany({
      skip: params.page * params.size,
      take: params.size,
      include: {
        users: true,
      },
    });
    const totalCount = await this.prisma.buses.count();
    const pagination = makePagination({
      page: params.page,
      size: params.size,
      totalCount,
    });
    return {
      data: buses,
      meta: pagination,
    };
  }

  async findOne(busId: number) {
    const bus = await this.prisma.buses.findUnique({
      where: {
        id: busId,
      },
      include: {
        users: true,
      },
    });

    if (!bus) {
      throw new NotFoundException(`Bus with id ${busId} not found`);
    }

    return bus;
  }

  async update(busId: number, updateBusDto: UpdateBusesDto) {
    const targetBus = await this.prisma.buses.findUnique({
      where: {
        id: busId,
      },
    });

    if (!targetBus) {
      throw new NotFoundException(`Bus with id ${busId} not found`);
    }

    if (targetBus.userId !== 0) {
      throw new Error('Only creator can update the bus');
    }

    const updateResult = await this.prisma.buses.update({
      where: {
        id: busId,
      },
      data: updateBusDto,
    });
    return updateResult;
  }

  async remove(busId: number) {
    const targetBus = await this.prisma.buses.findUnique({
      where: {
        id: busId,
      },
    });

    if (!targetBus) {
      throw new NotFoundException(`Bus with id ${busId} not found`);
    }

    if (targetBus.userId !== 0) {
      throw new Error('Only creator can delete the bus');
    }

    const deleteResult = await this.prisma.buses.delete({
      where: {
        id: busId,
      },
    });
    if (deleteResult.id) {
      return true;
    } else {
      throw new InternalServerErrorException('Failed to delete the bus');
    }
  }
}
