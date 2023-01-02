import 'reflect-metadata';
import { IsEmail, IsString, Length } from 'class-validator';

export class UserRegisterDto {
  @IsEmail({}, { message: 'The email is incorrect' })
  email: string;

  @IsString({ message: 'The password is incorrect' })
  password: string;

  @Length(3, 20)
  @IsString({ message: 'The name is incorrect' })
  name: string;

  @Length(3, 300)
  @IsString({ message: 'The message is incorrect' })
  message: string;
}
