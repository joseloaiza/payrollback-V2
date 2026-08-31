import { Test, TestingModule } from '@nestjs/testing';
import { SocialSecurityEntityService } from './social-security-entity.service';

describe('SocialSecurityEntityService', () => {
  let service: SocialSecurityEntityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocialSecurityEntityService],
    }).compile();

    service = module.get<SocialSecurityEntityService>(SocialSecurityEntityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
