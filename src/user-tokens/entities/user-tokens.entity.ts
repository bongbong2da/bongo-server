import { ApiProperty } from '@nestjs/swagger';
import { Users } from '../../users/entities/users.entity';

export class UserTokens {
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  id: number;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
    nullable: true,
  })
  userId: number | null;
  @ApiProperty({
    type: 'string',
  })
  accessToken: string;
  @ApiProperty({
    type: 'string',
  })
  refreshToken: string;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  accessExpiresAt: Date;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  refreshExpiresAt: Date;
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
    nullable: true,
  })
  users?: Users | null;
}
