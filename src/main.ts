import { Container } from 'inversify';

import { AppContainer } from './container';
import { TYPES } from './container/types';
import { App } from './app';

export interface IBootstrapReturn {
  appContainer: Container;
  app: App;
}
/** Start server */
const bootstrap = async (): Promise<IBootstrapReturn> => {
  const app = AppContainer.get<App>(TYPES.Application);
  await app.init();
  return { appContainer: AppContainer.container, app };
};

export const boot = bootstrap();
