import { IsNotEmpty, IsNumber, IsString, Min, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  lastName: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(16)
  age: number;

  @IsString()
  @IsNotEmpty()
  email: string;
}
