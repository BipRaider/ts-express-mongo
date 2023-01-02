import { NextFunction, Request, Response } from 'express';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { StatusCodes } from 'http-status-codes';

import { IMiddleware } from '../interface';

export class ValidateMiddleware implements IMiddleware {
  constructor(private classToValidate: ClassConstructor<object>) {}

  public execute = async ({ body, params, query }: Request, res: Response, next: NextFunction): Promise<void> => {
    const instance = plainToClass(this.classToValidate, { ...body, ...params, ...query });

    const valid: ValidationError[] = await validate(instance);

    if (valid.length > 0) {
      res.status(StatusCodes.UNPROCESSABLE_ENTITY).send({
        status: false,
        payload: { errors: this.modifyData(valid) },
      });
    } else next();
  };

  private modifyData = (valid: ValidationError[]): unknown => {
    return valid.map(data => {
      const { value, property, constraints, children } = data;

      let errorChildren;
      if (children.length > 0) {
        errorChildren = this.modifyData(children);
      }

      return { value, property, errorList: constraints, errorChildren };
    });
  };
}
