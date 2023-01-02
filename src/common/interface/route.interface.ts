import { NextFunction, Request, Response, Router } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { IMiddleware } from './middleware.interface';

export interface IControllerRoute {
  path: string;
  func: (req: Request<ParamsDictionary & { id: string }>, res: Response, next: NextFunction) => void;
  method: keyof Pick<Router, 'get' | 'post' | 'delete' | 'patch' | 'put'>;
  middlewares?: IMiddleware[];
  guard?: {
    admin?: boolean;
    auth?: boolean;
  };
}

export type ExpressReturnType = Response<unknown, Record<string, unknown>>;
