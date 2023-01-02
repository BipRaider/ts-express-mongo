import { ContainerList } from '../../container/app-container';

export const TYPES = {
  Controller: Symbol.for('SociolLinkController'),
  Service: Symbol.for('SociolLinkService'),
  Repository: Symbol.for('SociolLinkRepository'),
};

import { IController, IService, IRepository } from './interface';
import { Controller } from './controller';
import { Service } from './service';
import { Repository } from './repository';

export const init: ContainerList = (bind): void => {
  bind<IController>(TYPES.Controller).to(Controller);
  bind<IService>(TYPES.Service).to(Service);
  bind<IRepository>(TYPES.Repository).to(Repository).inSingletonScope();
};

export * from './interface';
export * from './model';
export * from './entity';
export * from './controller';
export * from './service';
export * from './repository';
