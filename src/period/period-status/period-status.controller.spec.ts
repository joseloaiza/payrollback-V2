import { Test, TestingModule } from '@nestjs/testing';
import { PeriodStatusController } from './period-status.controller';

describe('PeriodStatusController', () => {
  let controller: PeriodStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PeriodStatusController],
    }).compile();

    controller = module.get<PeriodStatusController>(PeriodStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
