import { Test, TestingModule } from '@nestjs/testing';
import { RecurrentPaymentController } from './recurrent-payment.controller';

describe('RecurrentPaymentController', () => {
  let controller: RecurrentPaymentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecurrentPaymentController],
    }).compile();

    controller = module.get<RecurrentPaymentController>(RecurrentPaymentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
