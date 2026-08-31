import { Test, TestingModule } from '@nestjs/testing';
import { AbsenteeTypeService } from './absentee-type.service';

describe('AbsenteeTypeService', () => {
  let service: AbsenteeTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AbsenteeTypeService],
    }).compile();

    service = module.get<AbsenteeTypeService>(AbsenteeTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
