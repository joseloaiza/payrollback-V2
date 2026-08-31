import { Test, TestingModule } from '@nestjs/testing';
import { EmployeePaymentService } from './employee-payment.service';

describe('EmployeePaymentService', () => {
  let service: EmployeePaymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeePaymentService],
    }).compile();

    service = module.get<EmployeePaymentService>(EmployeePaymentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
