import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

export enum Gender {
  male = 'male',
  female = 'female',
}

export enum Role {
  user = 'user',
  admin = 'admin',
}

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: Number })
  age: number;

  @Prop({ required: true, type: String })
  dob: string;

  @Prop({ required: true, type: String })
  contact: string;

  @Prop({ required: true, type: String })
  address: string;

  @Prop({ required: true, type: String })
  country: string;

  @Prop({ required: true, type: String })
  city: string;

  @Prop({ required: true, type: String })
  state: string;

  @Prop({ required: true, type: Number })
  zipCode: number;

  @Prop({ required: true, enum: Gender, type: String })
  gender: string;

  @Prop({ required: true, type: String })
  email: string;

  @Prop({ required: true, type: String })
  password: string;

  @Prop({ required: true, enum: Role, type: String })
  role: string;

  @Prop({ required: false, type: Boolean, default: false })
  isVerified: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
