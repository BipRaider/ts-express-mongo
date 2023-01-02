import 'reflect-metadata';
import { IsNotEmpty, IsMongoId } from 'class-validator';
import { ObjectId } from 'mongoose';

export class GetByUserIDDto {
  @IsNotEmpty({ message: 'The userId necessarily is required' })
  @IsMongoId({ message: 'The userId is incorrect' })
  userId: ObjectId;
}
