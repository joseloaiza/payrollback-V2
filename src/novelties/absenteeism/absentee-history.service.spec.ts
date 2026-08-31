import { Test, TestingModule } from '@nestjs/testing';
import { AbsenteeHistoryService } from './absentee-history.service';

describe('AbsenteeHistoryService', () => {
  let service: AbsenteeHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AbsenteeHistoryService],
    }).compile();

    service = module.get<AbsenteeHistoryService>(AbsenteeHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
