import { Test, TestingModule } from '@nestjs/testing';
import { ResonsContractTerminationController } from './reasons-contract-termination.controller';

describe('ResonsContractTerminationController', () => {
  let controller: ResonsContractTerminationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResonsContractTerminationController],
    }).compile();

    controller = module.get<ResonsContractTerminationController>(
      ResonsContractTerminationController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
