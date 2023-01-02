import 'reflect-metadata';
import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsMongoId,
  IsArray,
  IsEnum,
  IsNotEmptyObject,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ObjectId } from 'mongoose';

import { POSITION, STATUS_JOB } from '../interface';
import { PrivateDataDto } from './private-data.dto';

export class UpdateDto {
  @IsNotEmpty({ message: 'The id necessarily is required' })
  @IsString({ message: 'The id is incorrect' })
  @IsMongoId({ message: 'The id is incorrect' })
  id: string;

  @IsOptional()
  @IsArray({ message: 'The certificates is incorrect' })
  @IsString({ message: 'The certificates  is incorrect', each: true })
  certificates: string[];

  @IsOptional()
  @IsEnum(STATUS_JOB, { message: `The status is incorrect and should have: ${Object.values(STATUS_JOB).toString()}` })
  status: STATUS_JOB;

  @IsOptional()
  @IsEnum(POSITION, { message: `The position is incorrect and should have: ${Object.values(POSITION).toString()}` })
  position: POSITION;

  @IsOptional()
  @IsString({ message: 'The duration is incorrect' })
  duration: string;

  @IsOptional()
  @IsString({ message: 'The name is incorrect' })
  name: string;

  @IsOptional()
  @IsString({ message: 'The description is incorrect' })
  description: string;

  @IsOptional()
  @IsNotEmptyObject()
  @ValidateNested({ each: true })
  @Type(() => PrivateDataDto)
  privateData: PrivateDataDto;

  @IsOptional()
  @IsArray({ message: 'The addLink is incorrect' })
  @IsMongoId({ message: 'Some identifiers from addLink are incorrect.', each: true })
  addLink: ObjectId[];

  @IsOptional()
  @IsArray({ message: 'The addLanguages is incorrect' })
  @IsMongoId({ message: 'Some identifiers from addLanguages are incorrect.', each: true })
  addLanguages: ObjectId[];

  @IsOptional()
  @IsArray({ message: 'The addPlaceWork is incorrect' })
  @IsMongoId({ message: 'Some identifiers from addPlaceWork are incorrect.', each: true })
  addPlaceWork: ObjectId[];

  @IsOptional()
  @IsArray({ message: 'The removeLink is incorrect' })
  @IsMongoId({ message: 'Some identifiers from removeLink are incorrect.', each: true })
  removeLink: ObjectId[];

  @IsOptional()
  @IsArray({ message: 'The removeLanguages is incorrect' })
  @IsMongoId({ message: 'Some identifiers from removeLanguages are incorrect.', each: true })
  removeLanguages: ObjectId[];

  @IsOptional()
  @IsArray({ message: 'The removePlaceWork is incorrect' })
  @IsMongoId({ message: 'Some identifiers from removePlaceWork are incorrect.', each: true })
  removePlaceWork: ObjectId[];
}
