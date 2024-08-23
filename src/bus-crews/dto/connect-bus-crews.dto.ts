import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class BusCrewsIdUserIdUniqueInputDto {
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  @IsNotEmpty()
  @IsInt()
  id: number;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  @IsNotEmpty()
  @IsInt()
  userId: number;
}

@ApiExtraModels(BusCrewsIdUserIdUniqueInputDto)
export class ConnectBusCrewsDto {
  @ApiProperty({
    type: BusCrewsIdUserIdUniqueInputDto,
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => BusCrewsIdUserIdUniqueInputDto)
  id_userId: BusCrewsIdUserIdUniqueInputDto;
}
