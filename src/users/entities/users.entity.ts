import { ApiProperty } from '@nestjs/swagger';
import { BusCrews } from '../../bus-crews/entities/bus-crews.entity';
import { Friendships } from '../../friendships/entities/friendships.entity';
import { Notifications } from '../../notifications/entities/notifications.entity';
import { UserTokens } from '../../user-tokens/entities/user-tokens.entity';

export class Users {
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  id: number;
  @ApiProperty({
    type: 'string',
  })
  username: string;
  @ApiProperty({
    type: 'string',
  })
  email: string;
  @ApiProperty({
    type: 'string',
  })
  password: string;
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
    type: () => BusCrews,
    isArray: true,
    required: false,
  })
  busCrews?: BusCrews[];
  @ApiProperty({
    type: () => Friendships,
    isArray: true,
    required: false,
  })
  friendshipsFriendshipsFriendIdTousers?: Friendships[];
  @ApiProperty({
    type: () => Friendships,
    isArray: true,
    required: false,
  })
  friendshipsFriendshipsUserIdTousers?: Friendships[];
  @ApiProperty({
    type: () => Notifications,
    isArray: true,
    required: false,
  })
  notifications?: Notifications[];
  @ApiProperty({
    type: () => UserTokens,
    isArray: true,
    required: false,
  })
  userTokens?: UserTokens[];
}
