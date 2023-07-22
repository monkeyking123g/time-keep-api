import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TimeMonth } from './time-month.model';

@Injectable()
export class TimeMonthService {
  
  constructor(
    @InjectModel(TimeMonth.name) private timeMonthModel: Model<TimeMonth>,
  ) {}

  async getTimeMonth(owner_id: string): Promise<any> {
    return await this.timeMonthModel
      .find({ owner: owner_id })
      .populate('owner')
      .exec();
  }
  async create(user: Partial<TimeMonth>): Promise<TimeMonth> {
    const createdTimeMonth = new this.timeMonthModel(TimeMonth);
    return createdTimeMonth.save();
  }

  async findAll(): Promise<TimeMonth[]> {
    return this.timeMonthModel.find().exec();
  }
  async findById(id: string): Promise<TimeMonth> {
    return this.timeMonthModel.findById(id).exec();
  }

  async update(id: string, TimeMonth: Partial<TimeMonth>): Promise<TimeMonth> {
    return this.timeMonthModel.findByIdAndUpdate(id, TimeMonth, { new: true }).exec();
  }

  async delete(id: string): Promise<TimeMonth> {
    return this.timeMonthModel.findByIdAndDelete(id).exec();
  }
}