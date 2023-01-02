import { NextFunction, Request, Response } from 'express';
import { HTTPError } from '../../errors/http-error.class';
import { StatusCodes } from 'http-status-codes';

import { IMiddleware } from '../interface';

export class AuthGuard implements IMiddleware {
  execute = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    if (req.user) return next();
    await Promise.resolve(next(new HTTPError(StatusCodes.UNAUTHORIZED, 'Unauthorized', 'AuthGuard')));
  };
}
