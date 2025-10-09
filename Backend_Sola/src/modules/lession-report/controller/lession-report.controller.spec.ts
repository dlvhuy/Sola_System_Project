import { Test, TestingModule } from '@nestjs/testing';
import { LessionReportController } from './lession-report.controller';

describe('LessionReportController', () => {
  let controller: LessionReportController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LessionReportController],
    }).compile();

    controller = module.get<LessionReportController>(LessionReportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
