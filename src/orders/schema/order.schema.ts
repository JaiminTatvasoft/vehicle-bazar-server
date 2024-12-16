import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  u_id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  p_id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, type: String })
  prodName: string;

  @Prop({ required: true, type: String })
  noOfDays: string;

  @Prop({ required: true, type: String })
  startDate: string;

  @Prop({ required: true, type: String })
  endDate: string;

  @Prop({ required: true, type: String })
  pickUpLocation: string;

  @Prop({ required: true, type: String })
  dropLocation: string;

  @Prop({ required: true, type: Number })
  totalAmount: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
