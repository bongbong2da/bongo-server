import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUsersDto {
  @ApiProperty({
    type: 'integer',
    format: 'int32',
    default: 'autoincrement',
    required: false,
  })
  @IsOptional()
  @IsInt()
  id?: number;
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  username: string;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  email?: string | null;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  password?: string | null;
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
