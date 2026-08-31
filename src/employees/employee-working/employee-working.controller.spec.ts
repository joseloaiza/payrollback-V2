import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeWorkingController } from './employee-working.controller';

describe('EmployeeWorkingController', () => {
  let controller: EmployeeWorkingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeWorkingController],
    }).compile();

    controller = module.get<EmployeeWorkingController>(EmployeeWorkingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
