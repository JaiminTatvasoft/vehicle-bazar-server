import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  IsInt,
  Min,
  Max,
  IsDateString,
  IsMobilePhone,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { Gender, Role } from '../schema/user.schema';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(0)
  @Max(100)
  age: number;

  @IsDateString(
    {},
    { message: 'Date of Birth must be a valid ISO date string' },
  )
  dob: string;

  @IsMobilePhone()
  contact: string;

  @IsString()
  address: string;

  @IsString()
  country: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsInt()
  zipCode: number;

  @IsEnum(Gender, {
    message: 'Valid gender required',
  })
  gender: Gender;

  @IsEmail()
  email: string;

  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  password: string;

  @IsEnum(Role, {
    message: 'Valid role required',
  })
  role: Role;

  @IsBoolean()
  @IsOptional()
  isVerified: boolean;
}
