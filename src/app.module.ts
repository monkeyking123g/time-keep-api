import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TimeDayModule } from './time-day/time-day.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from "./user/user.module";
import { TimeMonthModule } from './time-month/time-month.module';
import { UploadModule } from './upload/upload.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nestjs_app'),
    TimeDayModule,
    UserModule,
    TimeMonthModule,
    UploadModule,
    AuthModule  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
