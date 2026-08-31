import { Test, TestingModule } from '@nestjs/testing';
import { SocialSecurityEntityTypeController } from './social-security-entity-type.controller';

describe('SocialSecurityEntityTypeController', () => {
  let controller: SocialSecurityEntityTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SocialSecurityEntityTypeController],
    }).compile();

    controller = module.get<SocialSecurityEntityTypeController>(SocialSecurityEntityTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
