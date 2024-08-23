import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class FriendshipsUserIdFriendIdUniqueInputDto {
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  @IsNotEmpty()
  @IsInt()
  userId: number;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  @IsNotEmpty()
  @IsInt()
  friendId: number;
}

@ApiExtraModels(FriendshipsUserIdFriendIdUniqueInputDto)
export class ConnectFriendshipsDto {
  @ApiProperty({
    type: FriendshipsUserIdFriendIdUniqueInputDto,
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => FriendshipsUserIdFriendIdUniqueInputDto)
  userId_friendId: FriendshipsUserIdFriendIdUniqueInputDto;
}
