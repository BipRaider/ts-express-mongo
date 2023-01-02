import { UserEntity } from '../user.entity';
import { IUserSchema, Role } from './user.model.interface';

export interface IValidateUser {
  verify: boolean;
  roles?: Role[] | string[];
  name?: string;
}

export interface IUserService {
  create: (dto: Pick<IUserSchema, 'email' | 'password' | 'name'>) => Promise<UserEntity | null>;
  validateUser: (dto: Pick<IUserSchema, 'email' | 'password'>) => Promise<IValidateUser>;
  getUserInfo: (user: Pick<IUserSchema, 'email'>) => Promise<UserEntity | null>;
}
