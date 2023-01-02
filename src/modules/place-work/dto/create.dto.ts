import 'reflect-metadata';
import { IsString, IsOptional, IsBoolean, IsNotEmpty, IsMongoId } from 'class-validator';
import { ObjectId } from 'mongoose';

import { IPlaceWork } from '../interface';

export class CreateDto implements IPlaceWork {
  @IsNotEmpty({ message: 'The userId necessarily is required' })
  @IsString({ message: 'The userId is incorrect' })
  @IsMongoId({ message: 'The userId is incorrect' })
  userId: ObjectId;

  @IsNotEmpty({ message: 'The name necessarily is required' })
  @IsString({ message: 'The name is incorrect' })
  name: string;

  @IsOptional()
  @IsString({ message: 'The description is incorrect' })
  description: string;

  @IsOptional()
  @IsString({ message: 'The link is incorrect' })
  link: string;

  @IsNotEmpty({ message: 'The position necessarily is required' })
  @IsString({ message: 'The position is incorrect' })
  position: string;

  @IsNotEmpty({ message: 'The start_duration necessarily is required' })
  @IsString({ message: 'The start_duration is incorrect' })
  start_duration: string;

  @IsNotEmpty({ message: 'The end_duration necessarily is required' })
  @IsString({ message: 'The end_duration is incorrect' })
  end_duration: string;

  @IsOptional()
  @IsBoolean({ message: 'The status is incorrect' })
  status: boolean;
}
