import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { HTTPError } from '../../errors/http-error.class';
import { User } from '../../core';
import { IMiddleware } from '../interface';

export class AdminGuard implements IMiddleware {
  execute = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    const { roles } = req.user;

    if (roles?.includes(User.Role.ADMIN)) return next();

    await Promise.resolve(next(new HTTPError(StatusCodes.UNAUTHORIZED, 'Unauthorized', 'AdminGuard')));
  };
}
