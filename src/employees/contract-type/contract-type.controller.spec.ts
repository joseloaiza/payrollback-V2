import { Test, TestingModule } from '@nestjs/testing';
import { ContractTypeController } from './contract-type.controller';

describe('ContractTypeController', () => {
  let controller: ContractTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContractTypeController],
    }).compile();

    controller = module.get<ContractTypeController>(ContractTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
