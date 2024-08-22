import { Injectable } from '@nestjs/common';
import { CreateBusCrewDto } from './dto/create-bus-crew.dto';
import { UpdateBusCrewDto } from './dto/update-bus-crew.dto';

@Injectable()
export class BusCrewsService {
  create(createBusCrewDto: CreateBusCrewDto) {
    return 'This action adds a new busCrew';
  }

  findAll() {
    return `This action returns all busCrews`;
  }

  findOne(id: number) {
    return `This action returns a #${id} busCrew`;
  }

  update(id: number, updateBusCrewDto: UpdateBusCrewDto) {
    return `This action updates a #${id} busCrew`;
  }

  remove(id: number) {
    return `This action removes a #${id} busCrew`;
  }
}
