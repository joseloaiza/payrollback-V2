import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeSocialSecurityService } from './employee-social-security.service';

describe('EmployeeSocialSecurityService', () => {
  let service: EmployeeSocialSecurityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeSocialSecurityService],
    }).compile();

    service = module.get<EmployeeSocialSecurityService>(EmployeeSocialSecurityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
