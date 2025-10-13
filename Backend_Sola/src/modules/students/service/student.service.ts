import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ApiResponse, ResponseHelper } from 'src/shares/helperResponse';
import { Student } from '../entity/student.entity';
import { Op } from 'sequelize';
import { CreateStudentDto } from '../DTO/student.dtos';
import { LessionReport } from 'src/modules/lession-report/entity/lession-report.entity';
import { MAX_LIMIT } from 'src/shares/constants';

@Injectable()
export class StudentsService {
    constructor(
        @InjectModel(Student)
        private studentModel: typeof Student,
    ) { }


    async findAll(options: { search?: string; page: number; limit: number }): Promise<ResponseHelper> {
        try {
            const { search, page, limit } = options;

            if (limit <= 0 || page <= 0) return ResponseHelper.error("số lượng và trang phải là số dương.", HttpStatus.BAD_REQUEST);

            if (limit > MAX_LIMIT) return ResponseHelper.error("số lượng phải bé hơn 100.", HttpStatus.BAD_REQUEST);

            const offset = (page - 1) * limit;

            const whereClause = search
                ? { name: { [Op.like]: `%${search}%` } }
                : {};

            const { rows, count } = await this.studentModel.findAndCountAll({
                where: whereClause,
                limit,
                offset,
                order: [['ID', 'ASC']],
            });

            const result = {
                total: count,
                currentPage: page,
                totalPages: Math.ceil(count / limit),
                data: rows,
            };

            return ResponseHelper.success('Lấy dữ liệu học sinh thành công', result);
        } catch (error) {
            return ResponseHelper.error('Xảy ra lỗi khi lấy danh sách học sinh', error.message);
        }
    }

    async create(data: Student): Promise<ResponseHelper> {
        try {
            const newStudent = await this.studentModel.create(data);
            
                const data1 ={
                    ID:newStudent.ID,
                    data:newStudent,
                }

            return ResponseHelper.success('Thêm học sinh thành công',data1);
        } catch (error) {
            return ResponseHelper.error('Xảy ra lỗi khi thêm học sinh', HttpStatus.BAD_REQUEST);
        }
    }

    async getStudentWithReports(studentId: number, reportLimit = 6): Promise<ResponseHelper> {
        try {

            const data = await this.studentModel.findOne({
                where: { id: studentId },
                attributes:['name', 'birthday','gender','nameParent','phoneNumber','address'],
                include: [
                    {
                        model: LessionReport,
                        separate: true, 
                        limit: reportLimit,
                        order: [['createdAt', 'DESC']],

                    },
                ],
            });
            return ResponseHelper.success('Lấy dữ liệu học sinh thành công', data);
        }
        catch (error) {
            return ResponseHelper.error('Xảy ra lỗi khi lấy dữ liệu học sinh', HttpStatus.BAD_REQUEST);
        }
    }
}
