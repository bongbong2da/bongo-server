import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class BusCrewsIdUserIdBusIdUniqueInputDto {
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
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  @IsNotEmpty()
  @IsInt()
  busId: number;
}

@ApiExtraModels(BusCrewsIdUserIdBusIdUniqueInputDto)
export class ConnectBusCrewsDto {
  @ApiProperty({
    type: BusCrewsIdUserIdBusIdUniqueInputDto,
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => BusCrewsIdUserIdBusIdUniqueInputDto)
  id_userId_busId: BusCrewsIdUserIdBusIdUniqueInputDto;
}
