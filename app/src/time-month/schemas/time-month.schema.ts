import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class TimeMonth extends Document {
  @Prop()
  month: string;

  @Prop()
  total: number;

  @Prop({ default: Date.now })
  dateCreated: Date;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true }) 
  owner: Types.ObjectId;

}

export const TimeMonthModel = SchemaFactory.createForClass(TimeMonth);
