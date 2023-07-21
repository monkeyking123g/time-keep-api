import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TimeMonthModel, TimeMonth } from './time-month.model';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TimeMonth.name, schema: TimeMonthModel }]),
    UserModule, 
  ],
})
export class TimeMonthModule {}