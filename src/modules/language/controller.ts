import 'reflect-metadata';
import { NextFunction, Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { StatusCodes } from 'http-status-codes';

import { TYPES, ILogger, BaseController, HTTPError, ValidateMiddleware, Cacher } from '../../core';
import * as Language from '.';
import { IController, IService } from './interface';
import { CreateDto, GetDto, RemoveDto, UpdateDto } from './dto';

@injectable()
export class Controller extends BaseController implements IController {
  public name = 'Language';
  constructor(
    @inject(TYPES.ILogger) private loggerService: ILogger,
    @inject(Language.TYPES.Service) private service: IService,
    @inject(Cacher.TYPES.CacherService) private cacher: Cacher.IService,
  ) {
    super(loggerService);
    this.loggerService.log(`${this.name}`);
    this.bindRoutes(
      [
        {
          path: '/create',
          method: 'post',
          func: this.create,
          middlewares: [new ValidateMiddleware(CreateDto)],
          guard: { auth: true },
        },
        {
          path: '/:id',
          method: 'get',
          func: this.find,
          middlewares: [new ValidateMiddleware(GetDto)],
        },
        {
          path: '/:id',
          method: 'delete',
          func: this.remove,
          middlewares: [new ValidateMiddleware(RemoveDto)],
          guard: { admin: true, auth: true },
        },
        {
          path: '/update',
          method: 'patch',
          func: this.update,
          middlewares: [new ValidateMiddleware(UpdateDto)],
          guard: { auth: true },
        },
      ],
      this.name,
    );
  }

  public create = async (
    { body }: Request<unknown, unknown, CreateDto>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const result = await this.service.create(body);

    if (!result)
      return next(
        new HTTPError(StatusCodes.UNPROCESSABLE_ENTITY, `This ${this.name} exists`, `The ${this.name} is not create`),
      );

    const payload = result.jsonPayload();

    this.ok(res, payload);
  };

  public update = async (
    req: Request<unknown, unknown, UpdateDto>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const result = await this.service.update(req.body);

    if (result === null)
      return next(
        new HTTPError(StatusCodes.NOT_FOUND, `This ${this.name} not update`, `The ${this.name} is not update`),
      );

    const payload = result.jsonPayload();

    this.ok(res, payload);
  };

  public find = async (req: Request<GetDto, unknown, unknown>, res: Response, next: NextFunction): Promise<void> => {
    const key = await this.cacher.get<Language.Entity>(req.params.id);

    if (key) {
      this.ok(res, key.jsonPayload());
      return;
    }

    const result = await this.service.find(req.params);

    if (result === null) {
      return next(new HTTPError(StatusCodes.NOT_FOUND, `This ${this.name} not found`, `The ${this.name} is not found`));
    }
    await this.cacher.set(req.params.id, result);

    const payload = result.jsonPayload();

    this.ok(res, payload);
  };

  public remove = async (
    req: Request<RemoveDto, unknown, unknown>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const result = await this.service.remove(req.params);

    if (!result) {
      return next(
        new HTTPError(StatusCodes.NOT_FOUND, `This ${this.name} not found`, `The ${this.name} is not remove`),
      );
    }
    const payload = result.jsonPayload();
    this.ok(res, payload);
  };
}
