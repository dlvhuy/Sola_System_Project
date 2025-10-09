import { Injectable, OnModuleInit } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class AppService implements OnModuleInit{
  constructor(private readonly sequelize: Sequelize ) {}

  async onModuleInit() {
    try {
      await this.sequelize.authenticate();
      console.log('✅ Kết nối MySQL thành công!');
    } catch (error) {
      console.error('❌ Lỗi khi kết nối MySQL:', error);
    }
  }
}
