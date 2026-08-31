import { Test, TestingModule } from '@nestjs/testing';
import { PaymentFrequencyService } from './payment-frequency.service';

describe('PaymentFrequencyService', () => {
  let service: PaymentFrequencyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentFrequencyService],
    }).compile();

    service = module.get<PaymentFrequencyService>(PaymentFrequencyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
