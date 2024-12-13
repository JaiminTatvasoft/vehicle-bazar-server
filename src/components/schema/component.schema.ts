import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type ComponentDocument = Component & Document;

@Schema({ timestamps: true })
export class Component {
  @Prop({ required: true, enum: ['admin', 'user'], type: String })
  clientType: string;

  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String })
  clientComponentName: string;

  @Prop({ required: true, type: Boolean, default: true })
  enable: string;
}

export const ComponentSchema = SchemaFactory.createForClass(Component);
