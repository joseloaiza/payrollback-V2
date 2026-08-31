import { Test, TestingModule } from '@nestjs/testing';
import { ContractRegimeController } from './contract-regime.controller';

describe('ContractRegimeController', () => {
  let controller: ContractRegimeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContractRegimeController],
    }).compile();

    controller = module.get<ContractRegimeController>(ContractRegimeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
