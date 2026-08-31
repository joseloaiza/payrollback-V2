import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeContractService } from './employee-contract.service';

describe('EmployeeContractService', () => {
  let service: EmployeeContractService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeContractService],
    }).compile();

    service = module.get<EmployeeContractService>(EmployeeContractService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
