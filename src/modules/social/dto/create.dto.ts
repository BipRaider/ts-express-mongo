import 'reflect-metadata';
import { IsString, IsEnum, IsNotEmpty, IsMongoId } from 'class-validator';
import { ObjectId } from 'mongoose';

import { ISocialLink, SOCIAL } from '../interface';

export class CreateDto implements ISocialLink {
  @IsNotEmpty({ message: 'The userId necessarily is required' })
  @IsString({ message: 'The userId is incorrect' })
  @IsMongoId({ message: 'The userId is incorrect' })
  userId: ObjectId;

  @IsNotEmpty({ message: 'The name necessarily is required' })
  @IsEnum(SOCIAL, { message: `The name is incorrect and should have: ${Object.values(SOCIAL).toString()}` })
  name: SOCIAL;

  @IsNotEmpty({ message: 'The link necessarily is required' })
  @IsString({ message: 'The link is incorrect' })
  link: string;
}
