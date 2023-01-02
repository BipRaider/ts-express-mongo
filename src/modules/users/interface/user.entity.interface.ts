import 'reflect-metadata';

import { AddSetGet, BaseEntity } from '../../../core';
import { IUserSchema, Role } from './user.model.interface';

export type TUpdateDB = Partial<Pick<IUserSchema, 'email' | 'name' | 'password'>>;
export type TJsonPayload = Partial<
  Pick<IUserSchema, 'email' | 'name' | 'password' | '_id' | 'roles'> & { message: string }
>;
export type TEntity = Partial<IUserSchema & { message?: string }>;

export abstract class AbstractEntity extends BaseEntity<TJsonPayload, TUpdateDB> {
  @AddSetGet<string>()
  public password: string = undefined;
  @AddSetGet<string>()
  public email: string = undefined;
  @AddSetGet<string>()
  public name: string = undefined;
  @AddSetGet<string>()
  public message: string = undefined;
  @AddSetGet<Role[]>()
  public roles: Role[] = [];

  constructor(data: TEntity) {
    super(data);
    if (data.name) this.name = data.name;
    if (data.email) this.email = data.email;
    if (data.password) this.password = data.password;
    if (data.roles) this.roles = data.roles;
    if (data.message) this.message = data.message;
  }

  public abstract setPassword(pass: string): Promise<void>;
  public abstract verifyPassword(password: string): Promise<boolean | never>;
  public jsonPayload: () => TJsonPayload;
  public updateDB: () => TUpdateDB;
}
