import { Test, TestingModule } from '@nestjs/testing';
import { MovementTypeController } from './movement-type.controller';

describe('MovementTypeController', () => {
  let controller: MovementTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovementTypeController],
    }).compile();

    controller = module.get<MovementTypeController>(MovementTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
