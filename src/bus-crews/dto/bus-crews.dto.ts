import { ApiProperty } from '@nestjs/swagger';

export class BusCrewsDto {
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
    type: 'integer',
    format: 'int32',
  })
  busId: number;
}
