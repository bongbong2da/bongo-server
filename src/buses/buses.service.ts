import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateBusesDto } from './dto/create-buses.dto';
import { UpdateBusesDto } from './dto/update-buses.dto';

@Injectable()
export class BusesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBusDto: CreateBusesDto) {
    const createResult = await this.prisma.buses.create({
      data: {
        ...createBusDto,
        status: 'open',
      },
    });
    return createResult;
  }

  async findAll() {
    return await this.prisma.buses.findMany();
  }

  async findOne(busId: number) {
    return await this.prisma.buses.findUnique({
      where: {
        id: busId,
      },
    });
  }

  async update(busId: number, updateBusDto: UpdateBusesDto) {
    const updateResult = await this.prisma.buses.update({
      where: {
        id: busId,
      },
      data: updateBusDto,
    });
    return updateResult;
  }

  remove(busId: number) {
    const deleteResult = this.prisma.buses.delete({
      where: {
        id: busId,
      },
    });
    return deleteResult;
  }
}
