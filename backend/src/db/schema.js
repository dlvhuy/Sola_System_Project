const { mysqlTable, int, varchar, serial, text, mysqlEnum } = require('drizzle-orm/mysql-core');
const { relations } = require('drizzle-orm');

// Table: students
const students = mysqlTable('students', {
    id: int('id').primaryKey().autoincrement(),
    name: varchar('name', { length: 100 }).notNull(),
    birthday: varchar('birthday', { length: 255 }).notNull(),
    gender: varchar('gender', { length: 50 }).notNull(),
    nameParent: varchar('nameParent', { length: 255 }).notNull(),
    phoneNumber: varchar('phoneNumber', { length: 20 }).notNull(),
    address: text('address').notNull(),
});

// Table: lession_report
const lessionReports = mysqlTable('lession_report', {
    id: int('id').primaryKey().autoincrement(),
    studentId: int('studentId').notNull(),
    name_lession: varchar('name_lession', { length: 100 }).notNull(),
    date_lession: varchar('date_lession', { length: 255 }).notNull(), // Request body might send string
    class_thinking_skill: int('class_thinking_skill').notNull(),
    comment_thinking_skill: text('comment_thinking_skill').notNull(),
    class_attitude: int('class_attitude').notNull(),
    comment_attitude: text('comment_attitude').notNull(),
    class_theory_skill: int('class_theory_skill').notNull(),
    comment_theory_skill: text('comment_theory_skill').notNull(),
    class_practice_skill: int('class_practice_skill').notNull(),
    comment_practice_skill: text('comment_practice_skill').notNull(),
});

// Relationships
const studentsRelations = relations(students, ({ many }) => ({
    lessionReports: many(lessionReports),
}));

const lessionReportsRelations = relations(lessionReports, ({ one }) => ({
    student: one(students, {
        fields: [lessionReports.studentId],
        references: [students.id],
    }),
}));

module.exports = {
    students,
    lessionReports,
    studentsRelations,
    lessionReportsRelations,
};
