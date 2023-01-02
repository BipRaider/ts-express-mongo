import 'reflect-metadata';
import { IsString, IsOptional, IsEmail } from 'class-validator';
import { PrivateData } from '../interface';

export class PrivateDataDto implements PrivateData {
  @IsOptional()
  @IsString({ message: 'The firstname is incorrect' })
  firstname: string;

  @IsOptional()
  @IsString({ message: 'The lastname is incorrect' })
  lastname: string;

  @IsOptional()
  @IsString({ message: 'The photo is incorrect' })
  photo: string;

  @IsOptional()
  @IsString({ message: 'The phone is incorrect' })
  phone: string;

  @IsOptional()
  @IsString({ message: 'The email is incorrect' })
  @IsEmail({}, { message: 'The email is incorrect' })
  email: string;

  @IsOptional()
  @IsString({ message: 'The address is incorrect' })
  address: string;
}
