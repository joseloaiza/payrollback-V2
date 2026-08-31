import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeTypeController } from './employee-type.controller';

describe('EmployeeTypeController', () => {
  let controller: EmployeeTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeTypeController],
    }).compile();

    controller = module.get<EmployeeTypeController>(EmployeeTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
