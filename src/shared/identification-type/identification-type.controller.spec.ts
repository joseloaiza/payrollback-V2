import { Test, TestingModule } from '@nestjs/testing';
import { IdentificationTypeController } from './identification-type.controller';

describe('IdentificationTypeController', () => {
  let controller: IdentificationTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IdentificationTypeController],
    }).compile();

    controller = module.get<IdentificationTypeController>(IdentificationTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
