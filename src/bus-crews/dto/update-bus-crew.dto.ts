import { PartialType } from '@nestjs/swagger';
import { CreateBusCrewDto } from './create-bus-crew.dto';

export class UpdateBusCrewDto extends PartialType(CreateBusCrewDto) {}
