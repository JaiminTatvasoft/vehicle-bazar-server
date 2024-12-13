import {
  IsEmail,
  IsInt,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

class ShippingDetailDto {
  @IsString()
  customerName: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsMobilePhone()
  contact: number;
}

class OrderItemDto {
  @IsString()
  u_id: string;

  @IsString()
  p_id: string;

  @IsString()
  @IsNotEmpty()
  prodName: string;

  @IsString()
  @IsOptional()
  noOfDays: string;

  @IsString()
  @IsOptional()
  startDate: string;

  @IsString()
  @IsOptional()
  endDate: string;

  @IsInt()
  totalPrice: number;
}

export class CreateStripeDto {
  orderItems: OrderItemDto;
  shippingDetail: ShippingDetailDto;
}

// export class CreateStripeDto {}
