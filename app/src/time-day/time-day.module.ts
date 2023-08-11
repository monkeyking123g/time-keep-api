import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TimeDayController } from './time-day.controller';
import { TimeDayService } from './time-day.service';
import { TimeDayModel, TimeDay } from './schemas/time-day.schema';
import { UserModule } from '../user/user.module';

@Module({
  imports: [ 
    MongooseModule.forFeature([{ name: TimeDay.name, schema: TimeDayModel,  }]), 
    UserModule],
  controllers: [TimeDayController],
  providers: [TimeDayService],
})
export class TimeDayModule {}