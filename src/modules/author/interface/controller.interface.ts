import { NextFunction, Request, Response } from 'express';

import { CreateDto, GetDto, RemoveDto, UpdateDto, GetByUserIDDto } from '../dto';

export interface IController {
  find: (req: Request<GetDto>, res: Response, next: NextFunction) => void;
  findByUserId: (req: Request<unknown, unknown, GetByUserIDDto>, res: Response, next: NextFunction) => void;
  remove: (req: Request<RemoveDto>, res: Response, next: NextFunction) => void;
  create: (req: Request<unknown, unknown, CreateDto>, res: Response, next: NextFunction) => void;
  update: (req: Request<unknown, unknown, UpdateDto>, res: Response, next: NextFunction) => void;
}
