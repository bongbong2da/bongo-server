import { ApiProperty } from '@nestjs/swagger';
import { Users } from '../../users/entities/users.entity';

export class Notifications {
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  id: number;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  userId: number;
  @ApiProperty({
    type: 'string',
  })
  message: string;
  @ApiProperty({
    type: 'boolean',
    nullable: true,
  })
  isRead: boolean | null;
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
  users?: Users;
}
