import { ApiProperty } from '@nestjs/swagger';

export class UserTokensDto {
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  id: number;
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
}
