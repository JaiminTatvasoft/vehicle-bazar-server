import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import * as mongoose from 'mongoose';

export class CreateOrderDto {
  @IsNotEmpty()
  u_id: string;

  @IsNotEmpty()
  p_id: string;

  @IsString()
  @IsNotEmpty()
  prodName: string;

  @IsString()
  @IsNotEmpty()
  noOfDays: string;

  @IsString()
  @IsNotEmpty()
  startDate: string;

  @IsString()
  @IsNotEmpty()
  endDate: string;

  @IsString()
  @IsNotEmpty()
  pickUpLocation: string;

  @IsString()
  @IsNotEmpty()
  dropLocation: string;

  @IsNumber()
  @IsNotEmpty()
  totalAmount: number;
}
