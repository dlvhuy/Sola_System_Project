import { Test, TestingModule } from '@nestjs/testing';
import { LessionReportService } from './lession-report.service';

describe('LessionReportService', () => {
  let service: LessionReportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LessionReportService],
    }).compile();

    service = module.get<LessionReportService>(LessionReportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
