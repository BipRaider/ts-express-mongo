import 'reflect-metadata';
import { Container, interfaces } from 'inversify';

import { AddSetGet } from '../decorators';
import { appBindings } from './bindings';

export type ContainerList = (bind: interfaces.Bind) => void;

class AppContainer {
  @AddSetGet<Container>()
  public container: Container;

  constructor() {
    this.container = new Container();
    this.container.load(appBindings);
  }

  /** Get class from container*/
  public get = <T>(type: symbol): T => {
    return this.container.get<T>(type);
  };
}

export default new AppContainer();
