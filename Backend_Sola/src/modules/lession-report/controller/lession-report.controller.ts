import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { LessionReportsService } from '../services/lession-report.service';
import { CreateLessionReportDto, mapLessionReportDtoToModel } from '../DTO/lession-report.dtos';

@Controller('lession-report')
export class LessionReportController {
    constructor(private readonly lessionReportService: LessionReportsService) { }

    @Post()
    async create(@Body() body: CreateLessionReportDto) {
        const dataBodyToModel = mapLessionReportDtoToModel(body)

        return this.lessionReportService.create(dataBodyToModel);
    }
    @Get()
    async GetDetail( @Query('id') id: number) {
        return this.lessionReportService.getLessionReportWithReports(id);
    }
}
