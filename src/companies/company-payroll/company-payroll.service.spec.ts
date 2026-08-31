import { Test, TestingModule } from '@nestjs/testing';
import { CompanyPayrollService } from './companyPayroll.service';

describe('CompanyPayrollService', () => {
  let service: CompanyPayrollService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyPayrollService],
    }).compile();

    service = module.get<CompanyPayrollService>(CompanyPayrollService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
