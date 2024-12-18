import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  p_id: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  useremail: string;

  @IsString()
  @IsNotEmpty()
  review: string;

  @IsNumber()
  @IsNotEmpty()
  rating: number;
}
