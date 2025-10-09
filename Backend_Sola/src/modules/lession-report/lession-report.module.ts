import { Module } from '@nestjs/common';
import { LessionReportController } from './controller/lession-report.controller';
import { LessionReportsService } from './services/lession-report.service';
import { LessionReport } from './entity/lession-report.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports:[SequelizeModule.forFeature([LessionReport])],
  controllers: [LessionReportController],
  providers: [LessionReportsService]
})
export class LessionReportModule {}
