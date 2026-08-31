import { Test, TestingModule } from '@nestjs/testing';
import { SolidarityController } from './solidarity.controller';

describe('SolidarityController', () => {
  let controller: SolidarityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SolidarityController],
    }).compile();

    controller = module.get<SolidarityController>(SolidarityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
