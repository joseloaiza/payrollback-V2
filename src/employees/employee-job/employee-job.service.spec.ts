import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeJobService } from './employee-job.service';

describe('EmployeeJobService', () => {
  let service: EmployeeJobService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeJobService],
    }).compile();

    service = module.get<EmployeeJobService>(EmployeeJobService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
