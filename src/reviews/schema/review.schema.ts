import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type ReviewDocument = Review & Document;

@Schema({ timestamps: true })
export class Review {
  @Prop({ required: true, type: String })
  u_id: ObjectId;

  @Prop({ required: true, type: String })
  p_id: ObjectId;

  @Prop({ required: true, type: String })
  username: string;

  @Prop({ required: true, type: String })
  useremail: string;

  @Prop({ required: true, type: String })
  review: string;

  @Prop({ required: true, type: Number, min: 1, max: 5 })
  rating: number;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
