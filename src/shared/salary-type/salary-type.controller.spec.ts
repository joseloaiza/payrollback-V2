import { Test, TestingModule } from '@nestjs/testing';
import { SalaryTypeController } from './salary-type.controller';

describe('SalaryTypeController', () => {
  let controller: SalaryTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalaryTypeController],
    }).compile();

    controller = module.get<SalaryTypeController>(SalaryTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
