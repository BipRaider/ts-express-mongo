import 'reflect-metadata';
import { IsEmail, IsString } from 'class-validator';

export class UserLoginDto {
  @IsEmail({}, { message: 'The email is incorrect' })
  email: string;

  @IsString({ message: 'The password is incorrect' })
  password: string;
}
