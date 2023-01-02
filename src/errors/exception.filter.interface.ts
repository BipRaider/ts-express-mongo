import { NextFunction, Request, Response } from 'express';

export interface IExceptionFilter {
  /** Need make `bind` and  hand on `this class` */
  catch: (err: Error, req: Request, res: Response, next: NextFunction) => void;
  /** Need make `bind` and  hand on `this class` */
  noPath: (req: Request, res: Response, next: NextFunction) => void;
}
