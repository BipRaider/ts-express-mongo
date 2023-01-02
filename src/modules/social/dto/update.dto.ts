import 'reflect-metadata';
import { IsString, IsNotEmpty, IsMongoId } from 'class-validator';

export class UpdateDto {
  @IsNotEmpty({ message: 'The id necessarily is required' })
  @IsString({ message: 'The id is incorrect' })
  @IsMongoId({ message: 'The id is incorrect' })
  id: string;

  @IsNotEmpty({ message: 'The link necessarily is required' })
  @IsString({ message: 'The link is incorrect' })
  link: string;
}
