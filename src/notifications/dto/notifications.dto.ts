import { ApiProperty } from '@nestjs/swagger';

export class NotificationsDto {
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  id: number;
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
}
