import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TimeMonth } from './schemas/time-month.schema';

@Injectable()
export class TimeMonthService {
  
  constructor(
    @InjectModel(TimeMonth.name) private timeMonthModel: Model<TimeMonth>,
  ) {}

  async create(user: Partial<TimeMonth>): Promise<TimeMonth> {
    try {
      if (!user.month || !user.owner || !user.total || !user.dateCreated ) {
        throw new BadRequestException("Invalid User data. Missing required properties.");
      }
      const createdTimeDay = new this.timeMonthModel(user);
      return await createdTimeDay.save();
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error; 
      } else {
        throw new InternalServerErrorException("Failed to create TimeDay", error.message);
      }
    }
  }

  async findAll(): Promise<TimeMonth[]> {
    return this.timeMonthModel.find().exec();
  }
  async findAllByOwner(ownerId: string): Promise<TimeMonth[]> {
    return this.timeMonthModel.find({ owner: ownerId }).exec();
  }

  async update(id: string, TimeMonth: Partial<TimeMonth>): Promise<TimeMonth> {
    return this.timeMonthModel.findByIdAndUpdate(id, TimeMonth, { new: true }).exec();
  }

  async delete(id: string): Promise<TimeMonth> {
    return this.timeMonthModel.findByIdAndDelete(id).exec();
  }
}