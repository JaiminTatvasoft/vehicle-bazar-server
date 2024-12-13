import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateComponentDto {
  @IsString()
  @IsEnum(['admin', 'user'])
  @IsNotEmpty()
  clientType: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  clientComponentName: string;
}
