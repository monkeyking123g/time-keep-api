import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TimeDay, TimeDayModel } from './time-day.model';

@Injectable()
export class TimeDayService {
  constructor(
    @InjectModel(TimeDay.name) private timeDayModel: Model<TimeDay>,
  ) {}

  async getUserTimeDay(owner_id: string): Promise<any> {
    return await this.timeDayModel
      .find({ owner: owner_id })
      .populate('owner')
      .exec();
  }
}