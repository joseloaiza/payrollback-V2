import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeTypeService } from './employee-type.service';

describe('EmployeeTypeService', () => {
  let service: EmployeeTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeTypeService],
    }).compile();

    service = module.get<EmployeeTypeService>(EmployeeTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
