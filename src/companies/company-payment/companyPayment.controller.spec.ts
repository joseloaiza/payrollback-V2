import { Test, TestingModule } from '@nestjs/testing';
import { CompanyPaymentController } from './companyPayment.controller';

describe('CompanyPaymentController', () => {
  let controller: CompanyPaymentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyPaymentController],
    }).compile();

    controller = module.get<CompanyPaymentController>(CompanyPaymentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
