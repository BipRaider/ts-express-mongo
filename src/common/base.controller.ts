import 'reflect-metadata';

import { Response, Router, NextFunction } from 'express';
import { injectable } from 'inversify';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { ILogger } from '../logger/logger.interface';
import { ExpressReturnType, IControllerRoute, IMiddleware } from './interface';

import { HTTPError } from '../errors/http-error.class';
import { Guards } from '.';

export { Router } from 'express';

/** The abstract class for all controllers */
@injectable()
export abstract class BaseController {
  private readonly _router: Router;

  constructor(private logger: ILogger) {
    this._router = Router();
  }

  get router(): Router {
    return this._router;
  }

  /** Default func for submit payload*/
  public send<T>(res: Response, code: number, payload: T): ExpressReturnType {
    try {
      res.type('application/json');
      return res.status(code).json({
        status: true,
        payload,
      });
    } catch (error) {
      return res.end();
    }
  }

  /** Default func for submit payload if the status OK*/
  public ok<T>(res: Response, payload: T): ExpressReturnType {
    return this.send<T>(res, StatusCodes.OK, payload);
  }
  /** Default func for submit status created*/
  public created(res: Response): ExpressReturnType {
    try {
      return res.sendStatus(StatusCodes.CREATED);
    } catch (error) {
      return res.end();
    }
  }

  /** Send error to front */
  public error(next: NextFunction, status: StatusCodes, message: string | ReasonPhrases, context: string): void {
    return next(new HTTPError(status, message, context));
  }

  /** Creating routers for controllers */
  protected bindRoutes(routes: IControllerRoute[], controllerName?: string): void {
    for (const route of routes) {
      controllerName
        ? this.logger.log(`[${controllerName}][${route.method}] ${route.path}`)
        : this.logger.log(`[${route.method}] ${route.path}`);

      const guards: IMiddleware[] | [] = this.addGuard(route);
      const middleware = [...guards, ...route.middlewares].map(m => m.execute.bind(m));
      const handler = route.func.bind(this);

      const pipeline = middleware ? [...middleware, handler] : handler;
      this.router[route.method](route.path, pipeline);
    }
  }
  /** Add default guard to router */
  private addGuard({ method, guard }: IControllerRoute): IMiddleware[] | [] {
    const guards: IMiddleware[] | [] = [];
    if (method === 'get' && !guard) return [];
    if (guard) {
      if (guard.admin) guards.splice(0, 0, new Guards.AdminGuard());
      if (guard.auth) guards.splice(0, 0, new Guards.AuthGuard());
    }
    return guards;
  }
}
