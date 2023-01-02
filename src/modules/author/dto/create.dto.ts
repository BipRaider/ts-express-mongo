import 'reflect-metadata';
import {
  IsString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
  IsArray,
  IsNotEmptyObject,
  IsMongoId,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ObjectId } from 'mongoose';
import { POSITION, STATUS_JOB } from '../interface';

import { PrivateDataDto } from './private-data.dto';

export class CreateDto {
  @IsOptional()
  @IsArray({ message: 'The certificates is incorrect' })
  @IsString({ message: 'The certificates is incorrect', each: true })
  certificates: string[];

  @IsNotEmpty({ message: 'The status necessarily is required' })
  @IsEnum(STATUS_JOB, { message: `The status is incorrect and should have: ${Object.values(STATUS_JOB).toString()}` })
  status: STATUS_JOB;

  @IsNotEmpty({ message: 'The id position is required' })
  @IsEnum(POSITION, {
    message: `The position is incorrect and should have: ${Object.values(POSITION).toString()}`,
  })
  position: POSITION;

  @IsNotEmpty({ message: 'The duration necessarily is required' })
  @IsString({ message: 'The duration is incorrect' })
  duration: string;

  @IsNotEmpty({ message: 'The name necessarily is required' })
  @IsString({ message: 'The name is incorrect' })
  name: string;

  @IsNotEmpty({ message: 'The description necessarily is required' })
  @IsString({ message: 'The description is incorrect' })
  description: string;

  @IsOptional()
  @IsNotEmptyObject()
  @ValidateNested({ each: true })
  @Type(() => PrivateDataDto)
  privateData: PrivateDataDto;

  @IsNotEmpty({ message: 'The userId necessarily is required' })
  @IsMongoId({ message: 'The userId is incorrect' })
  userId: ObjectId;
}
