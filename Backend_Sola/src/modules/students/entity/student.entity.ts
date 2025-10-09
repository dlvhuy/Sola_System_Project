import { Table, Column, Model, DataType, AllowNull, HasMany } from 'sequelize-typescript';
import { LessionReport } from 'src/modules/lession-report/entity/lession-report.entity';

@Table({
    tableName: 'students', // tên bảng trong DB
    timestamps: true,      // tự động tạo createdAt, updatedAt
})
export class Student extends Model<Student> {

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    ID: number;

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    birthday: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    gender: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    nameParent: string;

    @Column({
        type: DataType.STRING(10),
        allowNull: false
    })
    phoneNumber: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    address: string;

    @HasMany(() => LessionReport)
    lessionReports: LessionReport[];
}