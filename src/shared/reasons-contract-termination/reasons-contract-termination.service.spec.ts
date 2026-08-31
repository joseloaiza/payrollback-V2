import { Test, TestingModule } from '@nestjs/testing';
import { ResonsContractTerminationService } from './reasons-contract-termination.service';

describe('ResonsContractTerminationService', () => {
  let service: ResonsContractTerminationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResonsContractTerminationService],
    }).compile();

    service = module.get<ResonsContractTerminationService>(
      ResonsContractTerminationService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
