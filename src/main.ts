import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads');
  }

  await app.listen(3000);
}
bootstrap();
