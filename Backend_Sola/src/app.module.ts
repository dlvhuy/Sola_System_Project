import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { LessionReport } from './modules/lession-report/entity/lession-report.entity';
import { Student } from './modules/students/entity/student.entity';
import { StudentsModule } from './modules/students/students.module';
import { LessionReportModule } from './modules/lession-report/lession-report.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',                // Loại DB
      host: 'localhost',               // Server MySQL
      port: 3306,                      // Cổng mặc định MySQL
      username: 'root',                // Tài khoản
      password: 'SolaProject',                    // Mật khẩu (nếu có thì điền vào)
      database: 'testsola',           // Tên database bạn tạo
      models: [LessionReport,Student],         // Các model bạn muốn load
      autoLoadModels: true,            // Tự động load models
      synchronize: true,               // Tự động tạo bảng (chỉ dùng khi dev)
      logging: true,                   // Hiện log SQL trong terminal
    }),
    StudentsModule,LessionReportModule
  ],
})
export class AppModule {}