import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Student } from './entity/student.entity';
import { StudentsService } from './service/student.service';
import { StudentsController } from './controller/students.controller';

@Module({
  imports: [SequelizeModule.forFeature([Student])], // 👈 Cho phép inject model vào service
  providers: [StudentsService],
  controllers: [StudentsController],
})
export class StudentsModule {}
