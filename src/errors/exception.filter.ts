import 'reflect-metadata';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';

import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../container/types';
import { IExceptionFilter } from './exception.filter.interface';
import { HTTPError } from './http-error.class';

/*** Catching all errors and converting the error to payload then to send a message to the client
 * Has methods as :
 * @method `catch()`
 * @method `noPath()`
 */
@injectable()
export class ExceptionFilter implements IExceptionFilter {
  constructor(@inject(TYPES.ILogger) private logger: ILogger) {}

  catch(err: Error | HTTPError, _req: Request, res: Response, _next: NextFunction): void {
    try {
      if (err instanceof HTTPError) {
        this.logger.error(`[${err?.context}]: ${err?.statusCode}: ${err?.message}`);
        res.status(err.statusCode).send({
          status: false,
          payload: {
            status: err.statusCode,
            defaultMessage: err.defaultMessage,
            message: err.message,
          },
        });
      } else {
        this.logger.error(`${err.message}`);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
          status: false,
          payload: {
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            defaultMessage: 'Error',
            message: err.message,
          },
        });
      }
    } catch (e) {
      res.end();
    }
  }

  noPath(_req: Request, res: Response, _next: NextFunction): void {
    try {
      const err = new HTTPError(StatusCodes.NOT_FOUND, 'Requested page not found.', 'PAGE NOT FOUND');
      this.logger.error(`[${err.context}]-> ${err.statusCode}: ${err.message}`);
      res.status(err.statusCode).send({
        status: false,
        payload: {
          status: err.statusCode,
          defaultMessage: err.defaultMessage,
          message: err.message,
        },
      });
    } catch (e) {
      res.end();
    }
  }
}
