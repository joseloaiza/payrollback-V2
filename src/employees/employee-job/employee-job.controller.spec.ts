import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeJobController } from './employee-job.controller';

describe('EmployeeJobController', () => {
  let controller: EmployeeJobController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeJobController],
    }).compile();

    controller = module.get<EmployeeJobController>(EmployeeJobController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
