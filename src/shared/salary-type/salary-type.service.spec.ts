import { Test, TestingModule } from '@nestjs/testing';
import { SalaryTypeService } from './salary-type.service';

describe('SalaryTypeService', () => {
  let service: SalaryTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SalaryTypeService],
    }).compile();

    service = module.get<SalaryTypeService>(SalaryTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
