import 'reflect-metadata';
import { IsString, IsOptional, IsNotEmpty, IsMongoId, IsBoolean } from 'class-validator';

import { IPlaceWork } from '../interface';

export class UpdateDto implements Omit<IPlaceWork, 'userId'> {
  @IsNotEmpty({ message: 'The id necessarily is required' })
  @IsString({ message: 'The id is incorrect' })
  @IsMongoId({ message: 'The id is incorrect' })
  id: string;

  @IsOptional()
  @IsString({ message: 'The name is incorrect' })
  name: string;

  @IsOptional()
  @IsString({ message: 'The description is incorrect' })
  description: string;

  @IsOptional()
  @IsString({ message: 'The link is incorrect' })
  link: string;

  @IsOptional()
  @IsString({ message: 'The position is incorrect' })
  position: string;

  @IsOptional()
  @IsString({ message: 'The start_duration is incorrect' })
  start_duration: string;

  @IsOptional()
  @IsString({ message: 'The end_duration is incorrect' })
  end_duration: string;

  @IsOptional()
  @IsBoolean({ message: 'The status is incorrect' })
  status: boolean;
}
