const { db } = require('../../db');
const { students, lessionReports } = require('../../db/schema');
const { like, desc, eq, sql } = require('drizzle-orm');

const MAX_LIMIT = 100;

class StudentService {
    async findAll(page = 1, limit = 10, search = null) {
        if (limit <= 0 || page <= 0) {
            throw new Error("Invalid page or limit");
        }

        if (limit > MAX_LIMIT) {
            throw new Error("Limit exceeds maximum allowed");
        }

        const offset = (page - 1) * limit;
        const whereClause = search ? like(students.name, `%${search}%`) : undefined;

        // Get count
        const [{ count }] = await db
            .select({ count: sql`count(*)` })
            .from(students)
            .where(whereClause);

        // Get data
        const rows = await db.select()
            .from(students)
            .where(whereClause)
            .limit(limit)
            .offset(offset)
            .orderBy(students.id);

        return {
            total: count,
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            data: rows,
        };
    }

    async create(data) {
        // Here you might add validation logic before insertion
        const [result] = await db.insert(students).values(data);

        // Fetch the created student
        const [newStudent] = await db.select().from(students).where(eq(students.id, result.insertId));

        return {
            ID: newStudent.id,
            data: newStudent,
        };
    }

    async getStudentWithReports(studentId, reportLimit = 6) {
        const student = await db.query.students.findFirst({
            where: eq(students.id, studentId),
            columns: {
                name: true,
                birthday: true,
                gender: true,
                nameParent: true,
                phoneNumber: true,
                address: true
            },
            with: {
                lessionReports: {
                    limit: reportLimit,
                    orderBy: [desc(lessionReports.id)],
                }
            }
        });

        return student;
    }
}

module.exports = new StudentService();
