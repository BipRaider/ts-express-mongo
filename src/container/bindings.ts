import { ContainerModule, interfaces } from 'inversify';

import { ConfigService, IConfigService } from '../config';
import { MongoService } from '../database';
import { ExceptionFilter, IExceptionFilter } from '../errors';
import { ILogger, LoggerService } from '../logger';
import { TYPES } from './types';
import { App } from '../app';

import { User, Author, Language, PlaceWork, SocialLink, IEmailService, EmailService, Cacher } from '../core';

export const appBindings = new ContainerModule((bind: interfaces.Bind): void => {
  bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
  //error
  bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
  //Database
  bind<MongoService>(TYPES.MongoService).to(MongoService).inSingletonScope();
  //Config
  bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
  //Modules
  User.init(bind);
  PlaceWork.init(bind);
  Language.init(bind);
  SocialLink.init(bind);
  Author.init(bind);
  // Cacher
  bind<Cacher.IService>(Cacher.TYPES.CacherService).to(Cacher.Service).inSingletonScope();
  //Email
  bind<IEmailService>(TYPES.EmailService).to(EmailService).inSingletonScope();
  //App
  bind<App>(TYPES.Application).to(App);
});
