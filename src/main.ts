// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitamos CORS
  app.enableCors();

  await app.listen(4000);
  console.log(` App corriendo en: http://localhost:4000`);
}
bootstrap();

