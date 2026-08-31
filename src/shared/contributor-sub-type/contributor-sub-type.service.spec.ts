import { Test, TestingModule } from '@nestjs/testing';
import { ContributorSubTypeService } from './contributor-sub-type.service';

describe('ContributorSubTypeService', () => {
  let service: ContributorSubTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContributorSubTypeService],
    }).compile();

    service = module.get<ContributorSubTypeService>(ContributorSubTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
