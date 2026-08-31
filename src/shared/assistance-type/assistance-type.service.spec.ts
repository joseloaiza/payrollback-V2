import { Test, TestingModule } from '@nestjs/testing';
import { AssistanceTypeService } from './assistance-type.service';

describe('AssistanceTypeService', () => {
  let service: AssistanceTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssistanceTypeService],
    }).compile();

    service = module.get<AssistanceTypeService>(AssistanceTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
