import { IsEmail, IsOptional, Length } from 'class-validator';

export class CreateUserDto {
  @Length(5, 25)
  username: string;

  @IsOptional()
  class_id: string;

  @Length(3, 30)
  name: string;

  @IsEmail()
  email: string;

  @Length(11, 13)
  phone_number: string;

  @Length(10)
  address: string;
}
