import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateComparisiontableDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsBoolean()
  @IsNotEmpty()
  rentalCarSubscription: boolean;

  @IsBoolean()
  @IsNotEmpty()
  buyingUsedCar: boolean;

  @IsBoolean()
  @IsNotEmpty()
  buyingNewCar: boolean;
}
