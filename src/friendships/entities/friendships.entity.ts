import { FriendshipStatusTypes } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Users } from '../../users/entities/users.entity';

export class Friendships {
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  userId: number;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  friendId: number;
  @ApiProperty({
    enum: FriendshipStatusTypes,
  })
  status: FriendshipStatusTypes;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    nullable: true,
  })
  createdAt: Date | null;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    nullable: true,
  })
  updatedAt: Date | null;
  @ApiProperty({
    type: () => Users,
    required: false,
  })
  usersFriendshipsFriendIdTousers?: Users;
  @ApiProperty({
    type: () => Users,
    required: false,
  })
  usersFriendshipsUserIdTousers?: Users;
}
