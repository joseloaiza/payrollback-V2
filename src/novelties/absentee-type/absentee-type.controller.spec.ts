import { Test, TestingModule } from '@nestjs/testing';
import { AbsenteeTypeController } from './absentee-type.controller';

describe('AbsenteeTypeController', () => {
  let controller: AbsenteeTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AbsenteeTypeController],
    }).compile();

    controller = module.get<AbsenteeTypeController>(AbsenteeTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
