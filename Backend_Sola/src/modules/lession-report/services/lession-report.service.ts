import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { LessionReport } from '../entity/lession-report.entity';
import { ResponseHelper } from 'src/shares/helperResponse';

@Injectable()
export class LessionReportsService {
    constructor(
        @InjectModel(LessionReport)
        private lessionReportModel: typeof LessionReport,
    ) { }

    async create(data: LessionReport): Promise<ResponseHelper> {
        try {

            const newLesionReport = await this.lessionReportModel.create(data);
            const data1 = {
                ID: newLesionReport.ID,
                data: newLesionReport,
            }

            return ResponseHelper.success('Thêm báo cáo buổi học thành công', data1);
        } catch (error) {
            return ResponseHelper.error('Xảy ra lỗi khi thêm báo cáo buổi học', HttpStatus.BAD_REQUEST);
        }
    }

    async getLessionReportWithReports(LessionReportId: number): Promise<ResponseHelper> {
        try {

            const data = await this.lessionReportModel.findOne({
                where: { id: LessionReportId },
            });

            if (!data) return ResponseHelper.error("Không tìm thấy báo cáo", HttpStatus.NOT_FOUND)

            return ResponseHelper.success('Lấy dữ liệu báo cáo buổi học thành công', data);
        }
        catch (error) {
            return ResponseHelper.error('Xảy ra lỗi khi lấy dữ liệu báo cáo buổi học', HttpStatus.BAD_REQUEST);
        }
    }
}