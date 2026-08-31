import { Test, TestingModule } from '@nestjs/testing';
import { EmployeePaymentController } from './employee-payment.controller';

describe('EmployeePaymentController', () => {
  let controller: EmployeePaymentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeePaymentController],
    }).compile();

    controller = module.get<EmployeePaymentController>(EmployeePaymentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
