import { Test, TestingModule } from '@nestjs/testing';
import { ComparisiontableController } from './comparisiontable.controller';
import { ComparisiontableService } from './comparisiontable.service';

describe('ComparisiontableController', () => {
  let controller: ComparisiontableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComparisiontableController],
      providers: [ComparisiontableService],
    }).compile();

    controller = module.get<ComparisiontableController>(ComparisiontableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
