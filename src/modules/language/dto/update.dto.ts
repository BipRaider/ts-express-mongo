import 'reflect-metadata';
import { IsString, IsNotEmpty, IsMongoId, IsEnum } from 'class-validator';

import { LANGUAGES_LEVEL } from '../interface';

export class UpdateDto {
  @IsNotEmpty({ message: 'The id necessarily is required' })
  @IsString({ message: 'The id is incorrect' })
  @IsMongoId({ message: 'The id is incorrect' })
  id: string;

  @IsNotEmpty({ message: 'The level necessarily is required' })
  @IsEnum(LANGUAGES_LEVEL, {
    message: `The level is incorrect and should have: ${Object.values(LANGUAGES_LEVEL).toString()}`,
  })
  level: LANGUAGES_LEVEL;
}
