import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeContractController } from './employee-contract.controller';

describe('EmployeeContractController', () => {
  let controller: EmployeeContractController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeContractController],
    }).compile();

    controller = module.get<EmployeeContractController>(EmployeeContractController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
