import { ApiProperty } from '@nestjs/swagger';
import { Buses } from '../../buses/entities/buses.entity';
import { Users } from '../../users/entities/users.entity';

export class BusCrews {
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
    type: () => Buses,
    required: false,
  })
  buses?: Buses;
  @ApiProperty({
    type: () => Users,
    required: false,
  })
  users?: Users;
}
