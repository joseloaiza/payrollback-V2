import { Test, TestingModule } from '@nestjs/testing';
import { ContributorTypeController } from './contributor-type.controller';

describe('ContributorTypeController', () => {
  let controller: ContributorTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContributorTypeController],
    }).compile();

    controller = module.get<ContributorTypeController>(ContributorTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
