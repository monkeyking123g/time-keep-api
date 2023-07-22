import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UploadController } from './upload.controller';
import { multerOptions } from './multer-config';

@Module({
  imports: [MulterModule.register(multerOptions)],
  controllers: [UploadController],
})
export class UploadModule {}