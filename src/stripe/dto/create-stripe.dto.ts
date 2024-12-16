import {
  IsEmail,
  IsInt,
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

  @IsString()
  @IsNotEmpty()
  pickUpLocation: string;

  @IsString()
  @IsNotEmpty()
  dropLocation: string;

  @IsInt()
  totalPrice: number;
}

export class CreateStripeDto {
  orderItems: OrderItemDto;
  shippingDetail: ShippingDetailDto;
}

// export class CreateStripeDto {}
