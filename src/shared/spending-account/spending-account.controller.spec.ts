import { Test, TestingModule } from '@nestjs/testing';
import { SpendingAccountController } from './spending-account.controller';

describe('SpendingAccountController', () => {
  let controller: SpendingAccountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpendingAccountController],
    }).compile();

    controller = module.get<SpendingAccountController>(SpendingAccountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
