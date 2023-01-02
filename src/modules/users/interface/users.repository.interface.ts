import { UserEntity } from '../user.entity';
import { IUserSchema } from './user.model.interface';

export interface IUsersRepository {
  create: (user: UserEntity) => Promise<IUserSchema>;
  find: (email: string) => Promise<IUserSchema | null>;
}
