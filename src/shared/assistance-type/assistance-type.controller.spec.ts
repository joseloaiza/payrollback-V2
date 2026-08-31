import { Test, TestingModule } from '@nestjs/testing';
import { AssistanceTypeController } from './assistance-type.controller';

describe('AssistanceTypeController', () => {
  let controller: AssistanceTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssistanceTypeController],
    }).compile();

    controller = module.get<AssistanceTypeController>(AssistanceTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
