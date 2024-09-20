import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { makePagination } from '../utils/PaginationUtil';
import { UpdateUsersDto } from './dto/update-users.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: CreateUsersDto) {
    return this.prisma.users.create({
      data: user,
    });
  }

  async findAll(params: { page: number; size: number }) {
    const users = await this.prisma.users.findMany({
      skip: params.page * params.size,
      take: params.size,
    });

    const totalCount = await this.prisma.users.count();

    const pagination = makePagination({
      page: params.page,
      size: params.size,
      totalCount,
    });

    return {
      data: users,
      meta: pagination,
    };
  }

  async findOne(id: number) {
    return this.prisma.users.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, user: UpdateUsersDto) {
    const targetUser = await this.prisma.users.findUnique({
      where: {
        id,
      },
    });

    if (!targetUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return this.prisma.users.update({
      where: {
        id,
      },
      data: user,
    });
  }

  async remove(id: number) {
    const targetUser = await this.prisma.users.findUnique({
      where: {
        id,
      },
    });

    if (!targetUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    if (targetUser.id === 1) {
      throw new UnauthorizedException('Only owner can delete the user');
    }

    return this.prisma.users.delete({
      where: {
        id,
      },
    });
  }
}
