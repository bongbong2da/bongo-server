import { Test, TestingModule } from '@nestjs/testing';
import { BusCrewsService } from './bus-crews.service';

describe('BusCrewsService', () => {
  let service: BusCrewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusCrewsService],
    }).compile();

    service = module.get<BusCrewsService>(BusCrewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
