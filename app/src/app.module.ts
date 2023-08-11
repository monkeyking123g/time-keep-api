import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TimeDayModule } from './time-day/time-day.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from "./user/user.module";
import { TimeMonthModule } from './time-month/time-month.module';
import { UploadModule } from './upload/upload.module';
import { AuthModule } from './auth/auth.module';
import { User, UserModel } from './user/user.model';
import { TimeDay, TimeDayModel } from "./time-day/schemas/time-day.schema"
import { TimeMonth, TimeMonthModel } from './time-month/schemas/time-month.schema';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URL),
    MongooseModule.forFeature([
      { name: User.name, schema: UserModel},
      { name:  TimeDay.name, schema: TimeDayModel},
      { name:  TimeMonth.name, schema: TimeMonthModel},
    ]),
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
