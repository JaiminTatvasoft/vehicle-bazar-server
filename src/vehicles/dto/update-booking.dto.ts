import { IsString } from 'class-validator';

export class UpdateBookingDto {
  @IsString()
  id: string;

  @IsString()
  startDate: string;

  @IsString()
  endDate: string;
}
