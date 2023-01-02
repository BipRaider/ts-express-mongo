import { Server, createServer } from 'http';
//Lib
import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import express, { Express } from 'express';
import mongoSanitize from 'express-mongo-sanitize';
import fileUpload from 'express-fileupload';
import rateLimit from 'express-rate-limit';
import { StatusCodes } from 'http-status-codes';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import logger from 'morgan';
//database
import { MongoService } from './database';
//middleware
import { AuthMiddleware } from './common';
//controllers
import { User, Author, Language, PlaceWork, SocialLink } from './modules';
//Types and interface
import { TYPES, ILogger, ENV, IConfigService, IExceptionFilter, HTTPError, Cacher } from './core';

@injectable()
export class App {
  app: Express;
  server: Server;
  port: number;

  constructor(
    @inject(TYPES.ConfigService) private configService: IConfigService,
    @inject(TYPES.MongoService) private mongoService: MongoService,
    @inject(TYPES.ExceptionFilter) private exceptionFilter: IExceptionFilter,

    @inject(User.TYPES.Controller) private userController: User.UserController,

    @inject(Author.TYPES.Controller) private authorController: Author.Controller,
    @inject(PlaceWork.TYPES.Controller) private placeWorkController: PlaceWork.Controller,
    @inject(Language.TYPES.Controller) private languageController: Language.Controller,
    @inject(SocialLink.TYPES.Controller) private socialController: SocialLink.Controller,

    @inject(Cacher.TYPES.CacherService) private cacher: Cacher.IService,
    @inject(TYPES.ILogger) private logger: ILogger,
  ) {
    const port = this.configService.get(ENV.PORT);
    this.app = express();
    this.port = +port || 8002;
  }

  useMiddleware(): void {
    const whitelist = this.configService.getCors();
    const isDev = this.configService.get(ENV.NODE_ENV) === 'development';
    this.app.use(
      cors({
        origin: isDev
          ? '*'
          : (origin, callback): void => {
              if (whitelist.indexOf(origin) !== -1) callback(null, true);
              else callback(new HTTPError(StatusCodes.INTERNAL_SERVER_ERROR, 'Not allowed by CORS', 'CORS'));
            },
        credentials: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        optionsSuccessStatus: 204,
      }),
    );
    this.app.disable('x-powered-by');
    this.app.enable('trust proxy');
    this.app.use(logger('dev'));
    this.app.use(helmet());
    this.app.use(hpp());
    this.app.use(mongoSanitize());

    const rateWindowMs = Number(this.configService.get(ENV.RATE_TIME)) * 60 * 1000;
    const rateMax = Number(this.configService.get(ENV.RATE_LIMIT));
    this.app.use(
      rateLimit({
        windowMs: rateWindowMs ?? 10 * 60 * 1000, // 15 minutes
        max: rateMax ?? 300, // limit each IP to 300 requests per windowMs
      }),
    );

    this.app.use(bodyParser.json({ limit: '4mb' }));
    this.app.use(bodyParser.urlencoded({ extended: false, limit: '4mb' }));
    this.app.use(fileUpload({ tempFileDir: 'temp', useTempFiles: true }));

    const authMiddleware: AuthMiddleware = new AuthMiddleware(this.configService.get(ENV.SECRET));
    this.app.use(authMiddleware.execute.bind(authMiddleware));
  }

  useRoutes(): void {
    this.app.use('/users', this.userController.router);
    this.app.use('/about', this.authorController.router);
    this.app.use('/place-work', this.placeWorkController.router);
    this.app.use('/language', this.languageController.router);
    this.app.use('/social', this.socialController.router);
  }

  useExceptionFilters(): void {
    this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
    this.app.use(this.exceptionFilter.noPath.bind(this.exceptionFilter));
  }

  public async init(): Promise<void> {
    this.useMiddleware();
    this.useRoutes();
    this.useExceptionFilters();
    await this.mongoService.connect();
    await this.cacher.init();

    const server = createServer(this.app);

    this.server = server.listen(this.port, (): void => {
      this.logger.log(`[Server] started ${this.port}`);
    });
  }

  public close(): void {
    this.server.close((): never => process.exit(1));
  }
}
