import { Test, TestingModule } from '@nestjs/testing';
import { ContributorTypeService } from './contributor-type.service';

describe('ContributorTypeService', () => {
  let service: ContributorTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContributorTypeService],
    }).compile();

    service = module.get<ContributorTypeService>(ContributorTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
