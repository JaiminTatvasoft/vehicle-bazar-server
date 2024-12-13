import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type ComparisionDocument = Comparision & Document;

@Schema({ timestamps: true })
export class Comparision {
  @Prop({ required: true, type: String })
  title: string;

  @Prop({ required: true, type: Boolean })
  rentalCarSubscription: boolean;

  @Prop({ required: true, type: Boolean })
  buyingUsedCar: boolean;

  @Prop({ required: true, type: Boolean })
  buyingNewCar: boolean;
}

export const ComparisionSchema = SchemaFactory.createForClass(Comparision);
