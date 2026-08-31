import { Test, TestingModule } from '@nestjs/testing';
import { SocialSecurityEntityTypeService } from './social-security-entity-type.service';

describe('SocialSecurityEntityTypeService', () => {
  let service: SocialSecurityEntityTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocialSecurityEntityTypeService],
    }).compile();

    service = module.get<SocialSecurityEntityTypeService>(SocialSecurityEntityTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
