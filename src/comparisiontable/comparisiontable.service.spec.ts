import { Test, TestingModule } from '@nestjs/testing';
import { ComparisiontableService } from './comparisiontable.service';

describe('ComparisiontableService', () => {
  let service: ComparisiontableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComparisiontableService],
    }).compile();

    service = module.get<ComparisiontableService>(ComparisiontableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
