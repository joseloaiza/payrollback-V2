import { Test, TestingModule } from '@nestjs/testing';
import { NoRecurrentNoveltyService } from './no-recurrent-novelty.service';

describe('NoRecurrentNoveltyService', () => {
  let service: NoRecurrentNoveltyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NoRecurrentNoveltyService],
    }).compile();

    service = module.get<NoRecurrentNoveltyService>(NoRecurrentNoveltyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
