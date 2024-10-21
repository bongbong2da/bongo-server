import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { makePagination } from '../utils/PaginationUtil';

@Injectable()
export class FriendshipsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, targetUserId: number) {
    if (userId === targetUserId) {
      throw new BadRequestException('Cannot add yourself as a friend');
    }

    try {
      const isExist = await this.prisma.friendships.findFirst({
        where: {
          usersFriendshipsUserIdTousers: {
            id: userId,
          },
          usersFriendshipsFriendIdTousers: {
            id: targetUserId,
          },
        },
      });

      if (isExist) {
        throw new BadRequestException('Friendship already exists');
      }

      const createResult = await this.prisma.friendships.create({
        data: {
          usersFriendshipsUserIdTousers: {
            connect: {
              id: userId,
            },
          },
          usersFriendshipsFriendIdTousers: {
            connect: {
              id: targetUserId,
            },
          },
        },
      });

      if (createResult) {
        return true;
      }
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async getFriends(userId: number, params: { page: number; size: number }) {
    const friends = await this.prisma.friendships.findMany({
      where: {
        usersFriendshipsUserIdTousers: {
          id: userId,
        },
      },
      skip: params.page * params.size,
      take: params.size,
      include: {
        usersFriendshipsFriendIdTousers: true,
      },
    });

    const extractFriends = friends.map(
      (friend) => friend.usersFriendshipsFriendIdTousers,
    );

    const totalCount = await this.prisma.friendships.count({
      where: {
        usersFriendshipsUserIdTousers: {
          id: userId,
        },
      },
    });

    const pagination = makePagination({
      page: params.page,
      size: params.size,
      totalCount,
    });

    return {
      data: extractFriends,
      meta: pagination,
    };
  }

  async removeFriendship(userId: number, targetUserId: number) {
    try {
      const isExist = await this.prisma.friendships.findFirst({
        where: {
          usersFriendshipsUserIdTousers: {
            id: userId,
          },
          usersFriendshipsFriendIdTousers: {
            id: targetUserId,
          },
        },
      });

      if (!isExist) {
        throw new BadRequestException('Friendship does not exist');
      }

      const removeResult = await this.prisma.friendships.deleteMany({
        where: {
          AND: [
            {
              usersFriendshipsUserIdTousers: {
                id: userId,
              },
            },
            {
              usersFriendshipsFriendIdTousers: {
                id: targetUserId,
              },
            },
          ],
        },
      });
      if (removeResult) {
        return true;
      } else {
        throw new InternalServerErrorException('Failed to remove friendship');
      }
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
