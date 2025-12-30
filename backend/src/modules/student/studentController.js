const StudentService = require('./studentService');
const ResponseHelper = require('../../utils/responseHelper');

class StudentController {
    async findAll(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const search = req.query.search;

            const result = await StudentService.findAll(page, limit, search);
            return res.json(ResponseHelper.success('Lấy dữ liệu học sinh thành công', result));
        } catch (error) {
            console.error(error);
            const status = error.message.includes('valid') || error.message.includes('Limit') ? 400 : 500;
            return res.status(status).json(ResponseHelper.error('Xảy ra lỗi khi lấy danh sách học sinh', error.message, status));
        }
    }

    async create(req, res) {
        try {
            const data = req.body;
            const result = await StudentService.create(data);
            return res.json(ResponseHelper.success('Thêm học sinh thành công', result));
        } catch (error) {
            console.error(error);
            return res.status(400).json(ResponseHelper.error('Xảy ra lỗi khi thêm học sinh', error.message, 400));
        }
    }

    async getStudentWithReports(req, res) {
        try {
            const studentId = parseInt(req.params.id);
            const reportLimit = parseInt(req.query.reportLimit) || 6;

            const student = await StudentService.getStudentWithReports(studentId, reportLimit);

            if (!student) {
                return res.status(404).json(ResponseHelper.error('Không tìm thấy học sinh', null, 404));
            }

            return res.json(ResponseHelper.success('Lấy dữ liệu học sinh thành công', student));
        } catch (error) {
            console.error(error);
            return res.status(400).json(ResponseHelper.error('Xảy ra lỗi khi lấy dữ liệu học sinh', error.message, 400));
        }
    }
}

module.exports = new StudentController();
