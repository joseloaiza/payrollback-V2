import { Test, TestingModule } from '@nestjs/testing';
import { EmbargoTypeService } from './embargo-type.service';

describe('EmbargoTypeService', () => {
  let service: EmbargoTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmbargoTypeService],
    }).compile();

    service = module.get<EmbargoTypeService>(EmbargoTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
