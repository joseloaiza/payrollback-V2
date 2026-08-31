import { Test, TestingModule } from '@nestjs/testing';
import { ContractRegimeService } from './contract-regime.service';

describe('ContractRegimeService', () => {
  let service: ContractRegimeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContractRegimeService],
    }).compile();

    service = module.get<ContractRegimeService>(ContractRegimeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
