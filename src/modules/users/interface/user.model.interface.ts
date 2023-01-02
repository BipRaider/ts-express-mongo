import { Document, Model, ObjectId } from 'mongoose';
import { UserEntity } from '../user.entity';

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface IUserSchema extends Document<ObjectId | string> {
  name: string;
  email: string;
  password: string;
  roles: Role[];
  readonly create_at?: Date;
  readonly update_at?: Date;
}

export type IUser = Pick<IUserSchema, 'name' | 'email' | 'password' | 'roles' | '_id'>;

export type IUserInstance = IUserSchema;

export interface IUserModel extends Model<IUserInstance> {
  addition: (date: UserEntity) => Promise<IUserInstance>;
}
