import { Test, TestingModule } from '@nestjs/testing';
import { EmbargoTypeController } from './embargo-type.controller';

describe('EmbargoTypeController', () => {
  let controller: EmbargoTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmbargoTypeController],
    }).compile();

    controller = module.get<EmbargoTypeController>(EmbargoTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
