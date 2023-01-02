import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { IMiddleware } from '../interface';
import { IJWT } from '../../types/jwt.interface';

/*** Check the `JWT token` from the `authorization` string, if everything is ok, add the `user` to the `request` */
export class AuthMiddleware implements IMiddleware {
  constructor(private secret: string) {}
  /*** Need make `bind` and  hand on `this class`*/
  execute = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    const { authorization } = req.headers;
    if (authorization && typeof authorization === 'string') {
      const token = authorization.split(' ')[1];

      if (!token) return next();
      const payload: IJWT | null = await new Promise((res): void => {
        verify(token, this.secret, (err, decoded): void => {
          if (decoded) res(decoded as IJWT);
          if (err) res(null);
        });
      });

      if (payload) req.user = { email: payload.email, roles: payload.roles ?? [], name: payload.name };

      next();
    } else {
      next();
    }
  };
}
