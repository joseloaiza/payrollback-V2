import { Test, TestingModule } from '@nestjs/testing';
import { WorkPlaceRiskService } from './work-place-risk.service';

describe('WorkingPlaceRiskService', () => {
  let service: WorkPlaceRiskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkPlaceRiskService],
    }).compile();

    service = module.get<WorkPlaceRiskService>(WorkPlaceRiskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
