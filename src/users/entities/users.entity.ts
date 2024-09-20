import { ApiProperty } from '@nestjs/swagger';
import { BusCrews } from '../../bus-crews/entities/bus-crews.entity';
import { Buses } from '../../buses/entities/buses.entity';
import { Friendships } from '../../friendships/entities/friendships.entity';
import { Notifications } from '../../notifications/entities/notifications.entity';
import { SocialUsers } from '../../social-users/entities/social-users.entity';
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
    nullable: true,
  })
  email: string | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  password: string | null;
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
    type: () => Buses,
    isArray: true,
    required: false,
  })
  buses?: Buses[];
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
    type: () => SocialUsers,
    isArray: true,
    required: false,
  })
  socialUsers?: SocialUsers[];
  @ApiProperty({
    type: () => UserTokens,
    isArray: true,
    required: false,
  })
  userTokens?: UserTokens[];
}
