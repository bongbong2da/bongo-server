import { ApiProperty } from '@nestjs/swagger';

export class BusCrewsDto {
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  id: number;
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
}
