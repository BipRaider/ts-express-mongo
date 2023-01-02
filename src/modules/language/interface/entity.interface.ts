import 'reflect-metadata';
import { ObjectId } from 'mongoose';

import { AddSetGet, BaseEntity } from '../../../core';
import { ILanguage, ISchema, LANGUAGES_LEVEL, TLanguage } from './model.interface';

export type TUpdateDB = Partial<Pick<ILanguage, 'level'>>;
export type TJsonPayload = Omit<TLanguage, 'update_at' | 'create_at' | '_id'>;
export type TEntity = Partial<ISchema>;

export abstract class AbstractEntity extends BaseEntity<TJsonPayload, TUpdateDB> implements ILanguage {
  @AddSetGet<string>()
  public name: string = undefined;
  @AddSetGet<LANGUAGES_LEVEL>()
  public level: LANGUAGES_LEVEL = undefined;
  @AddSetGet<ObjectId>()
  userId: ObjectId = undefined;

  constructor(data: Partial<TEntity>) {
    super(data);
    if (data.name) this.name = data.name;
    if (data.level) this.level = data.level;
    if (data.userId) this.userId = data.userId;
  }
}
