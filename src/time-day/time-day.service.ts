import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TimeDay } from './time-day.model';

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
  async create(user: Partial<TimeDay>): Promise<TimeDay> {
    const createdTimeDay = new this.timeDayModel(TimeDay);
    return createdTimeDay.save();
  }

  async findAll(): Promise<TimeDay[]> {
    return this.timeDayModel.find().exec();
  }
  async findById(id: string): Promise<TimeDay> {
    return this.timeDayModel.findById(id).exec();
  }

  async update(id: string, TimeDay: Partial<TimeDay>): Promise<TimeDay> {
    return this.timeDayModel.findByIdAndUpdate(id, TimeDay, { new: true }).exec();
  }

  async delete(id: string): Promise<TimeDay> {
    return this.timeDayModel.findByIdAndDelete(id).exec();
  }
}