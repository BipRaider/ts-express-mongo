import { NextFunction, Request, Response } from 'express';

import { UserLoginDto, UserRegisterDto } from '../dto';

export interface IUserController {
  /*** User logs in and receives an access token*/
  login: (req: Request<unknown, unknown, UserLoginDto>, res: Response, next: NextFunction) => void;
  /*** User registration in the system*/
  register: (req: Request<unknown, unknown, UserRegisterDto>, res: Response, next: NextFunction) => void;
  /*** User information and has `AuthGuard` middleware*/
  refresh: (req: Request, res: Response, next: NextFunction) => void;
}
