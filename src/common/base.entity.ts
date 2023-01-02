import 'reflect-metadata';
import { ObjectId } from 'mongoose';

import { AddSetGet } from '../core';

export interface IBaseEntity {
  id: ObjectId | string;
  create_at?: Date | undefined;
  update_at?: Date | undefined;
}

export abstract class BaseEntity<TJsonPayload, TUpdateDB> implements IBaseEntity {
  /** ID from database */
  @AddSetGet<ObjectId | string>()
  public id: ObjectId | string = undefined;
  @AddSetGet<Date>()
  public create_at?: Date | undefined = undefined;
  @AddSetGet<Date>()
  public update_at?: Date | undefined = undefined;

  constructor(data: Partial<IBaseEntity & { _id: ObjectId | string }>) {
    if (data._id) this.id = data._id.toString();
    if (data.id && !this.id) this.id = data.id.toString();
    if (data.create_at) this.create_at = data.create_at;
    if (data.update_at) this.update_at = data.update_at;
  }
  /*** Get data to send to the client.*/
  abstract jsonPayload: () => TJsonPayload;
  /*** Get data to update.*/
  abstract updateDB: () => TUpdateDB;
}
