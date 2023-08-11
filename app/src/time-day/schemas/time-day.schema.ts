
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class TimeDay extends Document {
  @Prop({ required: false })
  owner_id: string;

  @Prop({ required: true })
  company: string;

  @Prop({ required: true })
  start: string;

  @Prop({ required: true })
  end: string;

  @Prop({ required: true })
  total: number;

  @Prop({ required: true, default: Date.now })
  dateCreated: Date;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true }) 
  owner: Types.ObjectId;


}

export const TimeDayModel = SchemaFactory.createForClass(TimeDay);
