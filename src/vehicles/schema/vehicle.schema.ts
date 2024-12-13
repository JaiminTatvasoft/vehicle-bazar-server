import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type VehicleDocument = Vehicle & Document;

@Schema({ timestamps: true })
export class Vehicle {
  @Prop({ required: true, type: String })
  u_Id: ObjectId;

  @Prop({ required: true, type: String })
  carname: string;

  @Prop({ required: true, type: String })
  brandname: string;

  @Prop({ required: true, type: String })
  segment: string;

  @Prop({ required: true, enum: ['manual', 'automatic'], type: String })
  transmission: string;

  @Prop({
    required: true,
    enum: ['petrol', 'diesel', 'electric', 'hybrid'],
    type: String,
  })
  fuelType: string;

  @Prop({ required: true, type: Number, min: 2, max: 10 })
  seater: number;

  @Prop({ required: true, type: Boolean })
  insurance: boolean;

  @Prop({ required: true, type: Boolean })
  roadSideAssistance: boolean;

  @Prop({ required: true, type: Number })
  rentalChargesPerDay: number;

  @Prop({ required: true, type: Number })
  extraKmCharges: number;

  @Prop({ required: true, type: Boolean })
  isVacant: boolean;

  @Prop({ required: true, type: String })
  imageUrl: string;

  @Prop({ required: true, type: String })
  baggage: string;

  @Prop({ required: true, type: String })
  availableLocation: string;

  @Prop({ required: true, type: Number })
  yearOfRegistration: number;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);

// @Prop({ type: [Object], default: [] }) // Array of booked date ranges
// bookings: Array<{ startDate: Date; endDate: Date }>;
