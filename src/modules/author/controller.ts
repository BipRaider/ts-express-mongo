import 'reflect-metadata';
import { NextFunction, Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { StatusCodes } from 'http-status-codes';

import { TYPES, ILogger, BaseController, HTTPError, ValidateMiddleware, Cacher } from '../../core';
import * as Author from '.';
import { IController, IService } from './interface';
import { CreateDto, GetByUserIDDto, GetDto, RemoveDto, UpdateDto } from './dto';

@injectable()
export class Controller extends BaseController implements IController {
  public name = 'Author';
  constructor(
    @inject(TYPES.ILogger) private loggerService: ILogger,
    @inject(Author.TYPES.Service) private authorService: IService,
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
          path: '/',
          method: 'get',
          func: this.findByUserId,
          middlewares: [new ValidateMiddleware(GetByUserIDDto)],
          guard: { auth: true },
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
    const result = await this.authorService.create(body);

    if (!result)
      return next(new HTTPError(StatusCodes.UNPROCESSABLE_ENTITY, 'This author exists', 'The author is not create'));

    const payload = result.jsonPayload();

    this.ok(res, payload);
  };

  public update = async (
    req: Request<unknown, unknown, UpdateDto>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const result = await this.authorService.update(req.body);

    if (result === null)
      return next(new HTTPError(StatusCodes.NOT_FOUND, 'This author not found', 'The author is not update'));

    const payload = result.jsonPayload();

    this.ok(res, payload);
  };

  find = async (req: Request<GetDto, unknown, unknown>, res: Response, next: NextFunction): Promise<void> => {
    const key = await this.cacher.get<Author.Entity>(`Author:${req.params.id}`);

    if (key) {
      this.ok(res, key.jsonPayload());
      return;
    }
    const result = await this.authorService.find(req.params);

    if (result === null)
      return next(new HTTPError(StatusCodes.NOT_FOUND, 'This author not found', 'The author is not find'));

    await this.cacher.set(`Author:${req.params.id}`, result);

    const payload = result.jsonPayload();
    this.ok(res, payload);
  };

  findByUserId = async (
    req: Request<unknown, unknown, GetByUserIDDto>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const key = await this.cacher.get<Author.Entity>(`Author:${req.body.userId}`);

    if (key) {
      this.ok(res, key.jsonPayload());
      return;
    }
    const result = await this.authorService.find(req.body);

    if (result === null)
      return next(new HTTPError(StatusCodes.NOT_FOUND, 'This author not found', 'The author is not find'));

    await this.cacher.set(`Author:${req.body.userId}`, result);

    const payload = result.jsonPayload();
    this.ok(res, payload);
  };

  remove = async (req: Request<RemoveDto, unknown, unknown>, res: Response, next: NextFunction): Promise<void> => {
    const result = await this.authorService.remove(req.params);

    if (!result) return next(new HTTPError(StatusCodes.NOT_FOUND, 'This author not found', 'The author is not remove'));

    const payload = result.jsonPayload();
    delete payload.id;
    this.ok(res, payload);
  };
}
