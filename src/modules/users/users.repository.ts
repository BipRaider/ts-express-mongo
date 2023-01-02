import 'reflect-metadata';
import { inject, injectable } from 'inversify';

import { TYPES, MongoService } from '../../core';
import { IUsersRepository, IUserSchema } from './interface';
import { UserEntity } from './user.entity';

/** Class for working with the database User */
@injectable()
export class UsersRepository implements IUsersRepository {
  constructor(@inject(TYPES.MongoService) private db: MongoService) {}

  public create = async (user: UserEntity): Promise<IUserSchema> => await this.db.user.addition(user);

  public find = async (email: string): Promise<IUserSchema | null> => {
    if (!email) return null;
    const user = await this.db.user.findOne({ email });
    if (!user) return null;
    return user;
  };
}
