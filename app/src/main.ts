import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());
  if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads');
  }

  await app.listen(3000);
}
bootstrap();