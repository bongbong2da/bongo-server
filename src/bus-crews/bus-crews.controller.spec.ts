import { Test, TestingModule } from '@nestjs/testing';
import { BusCrewsController } from './bus-crews.controller';
import { BusCrewsService } from './bus-crews.service';

describe('BusCrewsController', () => {
  let controller: BusCrewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusCrewsController],
      providers: [BusCrewsService],
    }).compile();

    controller = module.get<BusCrewsController>(BusCrewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
