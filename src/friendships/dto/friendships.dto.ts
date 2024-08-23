import { FriendshipStatusTypes } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class FriendshipsDto {
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
}
