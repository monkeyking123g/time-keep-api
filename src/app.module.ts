import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TimeDayModule } from './time-day/time-day.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from "./user/user.module";
import { TimeMonthModule } from './time-month/time-month.module';
import { multerOptions } from './multer-config';
import { MulterModule } from '@nestjs/platform-express';
import { UploadModule } from './upload.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nestjs_app'),
    TimeDayModule,
    UserModule,
    TimeMonthModule,
    UploadModule  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
