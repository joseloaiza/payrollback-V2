import { Test, TestingModule } from '@nestjs/testing';
import { PaymentFrequencyController } from './payment-frequency.controller';

describe('PaymentFrequencyController', () => {
  let controller: PaymentFrequencyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentFrequencyController],
    }).compile();

    controller = module.get<PaymentFrequencyController>(
      PaymentFrequencyController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
