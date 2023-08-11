import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
@Schema()
export class User extends Document {
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  image_url: string;

  @Prop()
  earning_hour: number;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'TimeDay' }] }) 
  timeDay: Types.ObjectId[];

}

export const UserModel = SchemaFactory.createForClass(User);