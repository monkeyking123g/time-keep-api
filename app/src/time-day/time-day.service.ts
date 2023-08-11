import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TimeDay } from './schemas/time-day.schema';

@Injectable()
export class TimeDayService {
  
  constructor(
    @InjectModel(TimeDay.name) private timeDayModel: Model<TimeDay>,
  ) {}


  async create(user: Partial<TimeDay>): Promise<TimeDay> {
    try {
      if (!user.company || !user.start || !user.end || !user.total ) {
        throw new BadRequestException("Invalid User data. Missing required properties.");
      }
      const createdTimeDay = new this.timeDayModel(user);
      return await createdTimeDay.save();
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error; 
      } else {
        throw new InternalServerErrorException("Failed to create TimeDay", error.message);
      }
    }
  }

  async findAll(): Promise<TimeDay[]> {
    return this.timeDayModel.find().exec();
  }

  async update(id: string, TimeDay: Partial<TimeDay>): Promise<TimeDay> {
    return this.timeDayModel.findByIdAndUpdate(id, TimeDay, { new: true }).exec();
  }

  async delete(id: string): Promise<TimeDay> {
    return this.timeDayModel.findByIdAndDelete(id).exec();
  }
  async findAllByAuthor(ownerId: string): Promise<TimeDay[]> {
    return this.timeDayModel.find({ owner: ownerId }).exec();
  }
}