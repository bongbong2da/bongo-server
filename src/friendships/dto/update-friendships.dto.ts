import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional } from 'class-validator';

export class UpdateFriendshipsDto {
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    default: 'now',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsDateString()
  createdAt?: Date | null;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    default: 'now',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsDateString()
  updatedAt?: Date | null;
}