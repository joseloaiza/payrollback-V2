import { Test, TestingModule } from '@nestjs/testing';
import { AbsenteeHistoryController } from './absentee-history.controller';

describe('AbsenteeHistoryController', () => {
  let controller: AbsenteeHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AbsenteeHistoryController],
    }).compile();

    controller = module.get<AbsenteeHistoryController>(
      AbsenteeHistoryController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
