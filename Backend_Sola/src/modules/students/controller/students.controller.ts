import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { StudentsService } from '../service/student.service';
import { CreateStudentDto, mapStudentDtoToModel } from '../DTO/student.dtos';

@Controller('students')
export class StudentsController {
    constructor(private readonly studentsService: StudentsService) { }

    @Post()
    async create (
        @Body() body: CreateStudentDto) {
        const dataBodyToModel = mapStudentDtoToModel(body)
        
        return this.studentsService.create(dataBodyToModel);
    }
    @Get('detail')
    async GetDetail (
        @Query('id') id: number,
        @Query('limit') limit?: number) {
        return this.studentsService.getStudentWithReports(id,limit);
    }

    @Get()
    async GetAll (
        @Query('search') search?: string,
        @Query('limit') limit: number = 20,
        @Query('page') page: number = 1) {
            
        return this.studentsService.findAll({search, page, limit});
    }
}
