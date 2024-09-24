import { BusStatusTypes } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { BusCrews } from '../../bus-crews/entities/bus-crews.entity';
import { Users } from '../../users/entities/users.entity';

export class Buses {
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  id: number;
  @ApiProperty({
    type: 'string',
  })
  title: string;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  startDatetime: Date;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  endDatetime: Date;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  description: string | null;
  @ApiProperty({
    enum: BusStatusTypes,
  })
  status: BusStatusTypes;
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
    type: 'boolean',
  })
  isPrivate: boolean;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  password: string | null;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  userId: number;
  @ApiProperty({
    type: () => BusCrews,
    required: false,
    nullable: true,
  })
  busCrews?: BusCrews | null;
  @ApiProperty({
    type: () => Users,
    required: false,
  })
  users?: Users;
}
