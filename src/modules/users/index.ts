import { ContainerList } from '../../container/app-container';

export const TYPES = {
  Controller: Symbol.for('UserController'),
  Service: Symbol.for('UserService'),
  Repository: Symbol.for('UsersRepository'),
};

import { IUserController, IUserService, IUsersRepository } from './interface';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { UsersRepository } from './users.repository';

export const init: ContainerList = (bind): void => {
  bind<IUserController>(TYPES.Controller).to(UserController);
  bind<IUserService>(TYPES.Service).to(UserService);
  bind<IUsersRepository>(TYPES.Repository).to(UsersRepository).inSingletonScope();
};

export * from './dto';
export * from './interface';
export * from './user.model';
export * from './user.entity';
export * from './users.controller';
export * from './users.repository';
export * from './users.service';
