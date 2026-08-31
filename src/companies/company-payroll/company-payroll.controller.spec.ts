import { Test, TestingModule } from '@nestjs/testing';
import { CompanyPayrollController } from './companyPayroll.controller';

describe('CompanyPayrollController', () => {
  let controller: CompanyPayrollController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyPayrollController],
    }).compile();

    controller = module.get<CompanyPayrollController>(CompanyPayrollController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
