import 'reflect-metadata';
import { inject, injectable } from 'inversify';

import { TYPES } from '.';
import { IUsersRepository, IUserService, IValidateUser, IUserSchema } from './interface';
import { UserEntity } from './user.entity';

@injectable()
export class UserService implements IUserService {
  constructor(@inject(TYPES.Repository) private usersRepository: IUsersRepository) {}

  public create = async (dto: Pick<IUserSchema, 'email' | 'password' | 'name'>): Promise<UserEntity | null> => {
    try {
      if (!dto.email) return null;
      const entity = new UserEntity(dto);
      await entity.setPassword(dto.password);
      const existed = await this.usersRepository.find(dto.email);
      if (existed) return null;
      const user = await this.usersRepository.create(entity);
      return new UserEntity(user);
    } catch {
      return null;
    }
  };

  public validateUser = async ({
    email,
    password,
  }: Pick<IUserSchema, 'email' | 'password'>): Promise<IValidateUser> => {
    const schema = await this.usersRepository.find(email);
    if (!schema) {
      return {
        verify: false,
      };
    }

    const entity = new UserEntity(schema);
    return {
      verify: await entity.verifyPassword(password),
      roles: entity.roles,
      name: entity.name,
    };
  };

  public getUserInfo = async ({ email }: Pick<IUserSchema, 'email'>): Promise<UserEntity | null> => {
    const schema = await this.usersRepository.find(email);

    if (!schema) return null;

    return new UserEntity(schema);
  };
}
