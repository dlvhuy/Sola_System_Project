import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:3001'], // ✅ chỉ cho phép frontend này
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true, // nếu bạn có dùng cookie hoặc Authorization header
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
