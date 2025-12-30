const LessionReportService = require('./lessionReportService');
const ResponseHelper = require('../../utils/responseHelper');

class LessionReportController {
    async create(req, res) {
        try {
            const data = req.body;
            const result = await LessionReportService.create(data);
            return res.json(ResponseHelper.success('Thêm báo cáo buổi học thành công', result));
        } catch (error) {
            console.error(error);
            return res.status(400).json(ResponseHelper.error('Xảy ra lỗi khi thêm báo cáo buổi học', error.message, 400));
        }
    }

    async getLessionReport(req, res) {
        try {
            const id = parseInt(req.params.id);
            const report = await LessionReportService.getLessionReport(id);

            if (!report) {
                return res.status(404).json(ResponseHelper.error("Không tìm thấy báo cáo", null, 404));
            }

            return res.json(ResponseHelper.success('Lấy dữ liệu báo cáo buổi học thành công', report));
        } catch (error) {
            console.error(error);
            return res.status(400).json(ResponseHelper.error('Xảy ra lỗi khi lấy dữ liệu báo cáo buổi học', error.message, 400));
        }
    }
}

module.exports = new LessionReportController();
