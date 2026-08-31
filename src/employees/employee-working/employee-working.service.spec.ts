import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeWorkingService } from './employee-working.service';

describe('EmployeeWorkingService', () => {
  let service: EmployeeWorkingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeWorkingService],
    }).compile();

    service = module.get<EmployeeWorkingService>(EmployeeWorkingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
