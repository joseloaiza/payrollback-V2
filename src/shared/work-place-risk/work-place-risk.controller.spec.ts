import { Test, TestingModule } from '@nestjs/testing';
import { WorkingPlaceRiskController } from './work-place-risk.controller';

describe('WorkingPlaceRiskController', () => {
  let controller: WorkingPlaceRiskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkingPlaceRiskController],
    }).compile();

    controller = module.get<WorkingPlaceRiskController>(
      WorkingPlaceRiskController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
