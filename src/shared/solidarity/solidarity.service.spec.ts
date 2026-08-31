import { Test, TestingModule } from '@nestjs/testing';
import { SolidarityService } from './solidarity.service';

describe('SolidarityService', () => {
  let service: SolidarityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SolidarityService],
    }).compile();

    service = module.get<SolidarityService>(SolidarityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
