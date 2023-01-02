import 'reflect-metadata';
import { ObjectId } from 'mongoose';

import { AddSetGet, BaseEntity } from '../../../core';
import { IPlaceWork, ISchema, TPlaceWork } from './model.interface';

export type TUpdateDB = Partial<Omit<IPlaceWork, 'id' | 'userId'>>;
export type TJsonPayload = Omit<TPlaceWork, 'update_at' | 'create_at' | '_id'>;
export type TPlaceWorkEntity = Partial<ISchema>;

export abstract class AbstractEntity extends BaseEntity<TJsonPayload, TUpdateDB> implements IPlaceWork {
  @AddSetGet<string>()
  public name: string = undefined;
  @AddSetGet<string>()
  public description: string = undefined;
  @AddSetGet<string>()
  public position: string = undefined;
  @AddSetGet<string>()
  public link: string = undefined;
  @AddSetGet<string>()
  public start_duration: string = undefined;
  @AddSetGet<string>()
  public end_duration: string = undefined;
  @AddSetGet<boolean>()
  public status: boolean = undefined;
  @AddSetGet<ObjectId>()
  public userId: ObjectId = undefined;

  constructor(data: Partial<TPlaceWorkEntity>) {
    super(data);
    if (data.name) this.name = data.name;
    if (data.link) this.link = data.link;
    if (data.description) this.description = data.description;
    if (data.status !== undefined) this.status = data.status;
    if (data.position) this.position = data.position;
    if (data.start_duration) this.start_duration = data.start_duration;
    if (data.end_duration) this.end_duration = data.end_duration;
    if (data.userId) this.userId = data.userId;
  }
}
