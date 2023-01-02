import 'reflect-metadata';
import { IsString, IsEnum, IsNotEmpty, IsMongoId } from 'class-validator';
import { ObjectId } from 'mongoose';

import { ILanguage, LANGUAGES_LEVEL } from '../interface';

export class CreateDto implements ILanguage {
  @IsNotEmpty({ message: 'The userId necessarily is required' })
  @IsString({ message: 'The userId is incorrect' })
  @IsMongoId({ message: 'The userId is incorrect' })
  userId: ObjectId;

  @IsNotEmpty({ message: 'The name necessarily is required' })
  @IsString({ message: 'The name is incorrect' })
  name: string;

  @IsNotEmpty({ message: 'The level necessarily is required' })
  @IsEnum(LANGUAGES_LEVEL, {
    message: `The level is incorrect and should have: ${Object.values(LANGUAGES_LEVEL).toString()}`,
  })
  level: LANGUAGES_LEVEL;
}
