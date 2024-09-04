import { ApiProperty } from '@nestjs/swagger';

export class SocialUsersDto {
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  id: number;
  @ApiProperty({
    type: 'string',
  })
  provider: string;
  @ApiProperty({
    type: 'string',
  })
  socialId: string;
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
    type: 'string',
  })
  nickname: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  profileImageUrl: string | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  email: string | null;
}
