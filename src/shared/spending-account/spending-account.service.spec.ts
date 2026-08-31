import { Test, TestingModule } from '@nestjs/testing';
import { SpendingAccountService } from './spending-account.service';

describe('SpendingAccountService', () => {
  let service: SpendingAccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpendingAccountService],
    }).compile();

    service = module.get<SpendingAccountService>(SpendingAccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
