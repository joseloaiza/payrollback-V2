import { Test, TestingModule } from '@nestjs/testing';
import { SocialSecurityEntityController } from './social-security-entity.controller';

describe('SocialSecurityEntityController', () => {
  let controller: SocialSecurityEntityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SocialSecurityEntityController],
    }).compile();

    controller = module.get<SocialSecurityEntityController>(SocialSecurityEntityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
