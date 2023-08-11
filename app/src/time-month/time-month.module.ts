import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TimeMonthModel, TimeMonth } from './schemas/time-month.schema';
import { UserModule } from '../user/user.module';
import { TimeDayController} from "./time-month.controller"
import { TimeMonthService } from "./time-month.service"
@Module({
  imports: [
    MongooseModule.forFeature([{ name: TimeMonth.name, schema: TimeMonthModel }]),
    UserModule, 
  ],
  controllers: [TimeDayController],
  providers: [ TimeMonthService],
})
export class TimeMonthModule {}