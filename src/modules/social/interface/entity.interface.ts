import 'reflect-metadata';
import { ObjectId } from 'mongoose';

import { AddSetGet, BaseEntity } from '../../../core';
import { ISocialLink, ISchema, SOCIAL, TSociolLink } from './model.interface';

export type TUpdateDB = Partial<Pick<ISocialLink, 'link'>>;
export type TJsonPayload = Omit<TSociolLink, 'update_at' | 'create_at' | '_id'>;
export type TEntity = Partial<ISchema>;

export abstract class AbstractEntity extends BaseEntity<TJsonPayload, TUpdateDB> implements ISocialLink {
  @AddSetGet<string>()
  public link: string = undefined;
  @AddSetGet<SOCIAL>()
  public name: SOCIAL = undefined;
  @AddSetGet<ObjectId>()
  public userId: ObjectId = undefined;

  constructor(data: Partial<TEntity>) {
    super(data);
    if (data.name) this.name = data.name;
    if (data.link) this.link = data.link;
    if (data.userId) this.userId = data.userId;
  }
}
