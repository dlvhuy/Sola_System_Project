const { db } = require('../../db');
const { lessionReports } = require('../../db/schema');
const { eq } = require('drizzle-orm');

class LessionReportService {
    async create(data) {
        const [result] = await db.insert(lessionReports).values(data);
        const [newReport] = await db.select().from(lessionReports).where(eq(lessionReports.id, result.insertId));

        return {
            ID: newReport.id,
            data: newReport,
        };
    }

    async getLessionReport(id) {
        const [report] = await db.select().from(lessionReports).where(eq(lessionReports.id, id));
        return report;
    }
}

module.exports = new LessionReportService();
