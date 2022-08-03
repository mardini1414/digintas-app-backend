import { IsEmail, IsOptional, Length, Matches } from 'class-validator';

export class UpdateUserDto {
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

  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message:
      'password must contain one number, one letter, one special character and a minimum length of 8',
  })
  password: string;
}
