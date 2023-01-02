import 'reflect-metadata';
import { NextFunction, Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { sign } from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';

import {
  IEmailService,
  IJWT,
  ILogger,
  TYPES,
  ENV,
  IConfigService,
  BaseController,
  ValidateMiddleware,
} from '../../core';
import * as User from '.';
import { IUserController, IUserService, Role } from './interface';
import { UserLoginDto, UserRegisterDto } from './dto';

@injectable()
export class UserController extends BaseController implements IUserController {
  constructor(
    @inject(TYPES.ILogger) private loggerService: ILogger,
    @inject(User.TYPES.Service) private userService: IUserService,
    @inject(TYPES.ConfigService) private configService: IConfigService,
    @inject(TYPES.EmailService) private emailService: IEmailService,
  ) {
    super(loggerService);
    this.loggerService.log(`[User]`);
    this.bindRoutes(
      [
        {
          path: '/register',
          method: 'post',
          func: this.register,
          middlewares: [new ValidateMiddleware(UserRegisterDto)],
        },
        {
          path: '/login',
          method: 'post',
          func: this.login,
          middlewares: [new ValidateMiddleware(UserLoginDto)],
        },
        {
          path: '/refresh',
          method: 'get',
          func: this.refresh,
          middlewares: [],
          guard: { auth: true },
        },
      ],
      UserController.name,
    );
  }

  async login(req: Request<unknown, unknown, UserLoginDto>, res: Response, next: NextFunction): Promise<void> {
    const result = await this.userService.validateUser(req.body);

    if (!result.verify) return this.error(next, StatusCodes.UNAUTHORIZED, 'Error authorization', 'Login');

    const accessToken = await this.signJWT({
      email: req.body.email,
      roles: result.roles ?? [],
      name: result.name ?? 'Visitor',
    });

    this.ok(res, {
      accessToken,
      private: result.roles ? result.roles.includes(Role.USER) : false,
      admin: result.roles ? result.roles.includes(Role.ADMIN) : false,
      name: result.name,
    });
  }

  async register(
    { body }: Request<unknown, unknown, UserRegisterDto>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const result = await this.userService.create(body);

    if (result === null) return this.error(next, StatusCodes.UNPROCESSABLE_ENTITY, 'This user exists', 'register');
    result.message = body.message;
    await this.emailService.create(result).htmlRegister().send();

    this.created(res);
  }

  public refresh = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { user } = req;

    if (!user.email) return this.error(next, StatusCodes.NOT_FOUND, 'This user is not exists', 'refresh');

    const accessToken = await this.signJWT(user);

    this.ok(res, {
      accessToken,
      private: user.roles ? user.roles.includes(Role.USER) : false,
      admin: user.roles ? user.roles.includes(Role.ADMIN) : false,
      name: user.name,
    });
  };

  /**Create accessToken */
  private signJWT({ email, roles, name }: IJWT): Promise<string> {
    const secret = this.configService.get(ENV.SECRET);

    return new Promise<string>((res, rej): void => {
      sign(
        {
          email,
          roles,
          name,
          iat: Math.floor(Date.now() / 1000),
        },
        secret,
        { algorithm: 'HS256', expiresIn: '1d' },
        (err, token): void => {
          if (err) rej(err);
          res(token);
        },
      );
    });
  }
}
