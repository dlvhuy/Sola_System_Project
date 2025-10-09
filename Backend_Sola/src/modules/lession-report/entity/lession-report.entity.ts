import { Table, Column, Model, DataType, AllowNull, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Student } from 'src/modules/students/entity/student.entity';

@Table({
    tableName: 'lession_report', // tên bảng trong DB
    timestamps: true,      // tự động tạo createdAt, updatedAt
})
export class LessionReport extends Model<LessionReport> {

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    ID: number;

    @ForeignKey(() => Student)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    StudentId: number;

    // Mỗi LessionReport thuộc về 1 Class
    @BelongsTo(() => Student)
    student: Student;

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
    })
    name_lession: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    date_lession: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    class_thinking_skill: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    comment_thinking_skill: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    class_attitude: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    comment_attitude: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    class_theory_skill: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    comment_theory_skill: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    class_practice_skill: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    comment_practice_skill: string;
}