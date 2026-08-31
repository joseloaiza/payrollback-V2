import { Test, TestingModule } from '@nestjs/testing';
import { NoRecurrentNovelyController } from './no-recurrent-novelty.controller';

describe('NoRecurrentNovelyController', () => {
  let controller: NoRecurrentNovelyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NoRecurrentNovelyController],
    }).compile();

    controller = module.get<NoRecurrentNovelyController>(
      NoRecurrentNovelyController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
