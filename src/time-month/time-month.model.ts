import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../user/user.model';

@Schema()
export class TimeMonth extends Document {
  @Prop()
  month: string;

  @Prop()
  total: number;

  @Prop({ default: Date.now })
  dateCreated: Date;

  @Prop({ type: Types.ObjectId, ref: User.name })
  owner: User;
}

export const TimeMonthModel = SchemaFactory.createForClass(TimeMonth);
