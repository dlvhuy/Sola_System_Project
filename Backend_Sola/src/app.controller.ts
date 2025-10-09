import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Sequelize } from 'sequelize-typescript';

@Controller()
export class AppController {
   constructor(private readonly sequelize: Sequelize) {}

  @Get('test')
  async testConnection() {
    try {
      await this.sequelize.authenticate();
      return { success: true, message: '✅ Đã kết nối MySQL thành công!' };
    } catch (error) {
      return { success: false, message: '❌ Kết nối MySQL thất bại', error: error.message };
    }
  }
  
}
