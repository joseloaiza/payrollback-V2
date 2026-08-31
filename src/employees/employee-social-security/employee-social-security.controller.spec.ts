import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeSocialSecurityController } from './employee-social-security.controller';

describe('EmployeeSocialSecurityController', () => {
  let controller: EmployeeSocialSecurityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeSocialSecurityController],
    }).compile();

    controller = module.get<EmployeeSocialSecurityController>(EmployeeSocialSecurityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
