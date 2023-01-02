import 'reflect-metadata';
import { ObjectId } from 'mongoose';

import { AddSetGet, BaseEntity } from '../../../core';
import { SocialLink, Language, PlaceWork } from '../../index';
import { IAuthor, ISchema, PrivateData, TAuthor } from './model.interface';
import { POSITION, STATUS_JOB } from './enum';

export type TUpdateDB = Partial<
  Omit<IAuthor, 'privateData' | 'certificates' | 'languages' | 'place_work' | 'link' | 'id'>
>;
export type TJsonPayload = Omit<TAuthor, 'update_at' | 'create_at' | '_id'>;

export type IUpdateDBLists = {
  /** Array for add social link */
  addLink?: ObjectId[];
  /** Array for add languages */
  addLanguages?: ObjectId[];
  /** Array for add place work */
  addPlaceWork?: ObjectId[];
  /** Array for remove social link */
  removeLink?: ObjectId[];
  /** Array for remove languages */
  removeLanguages?: ObjectId[];
  /** Array for remove  place work */
  removePlaceWork?: ObjectId[];
};
export type TUpdateDBLists = { userId: string | ObjectId } & IUpdateDBLists;

export type TEntity = Partial<ISchema> & IUpdateDBLists;

export abstract class AbstractEntity extends BaseEntity<TJsonPayload, TUpdateDB> implements IAuthor {
  @AddSetGet<string>()
  public name: string = undefined;
  @AddSetGet<ObjectId>()
  public userId: ObjectId = undefined;
  @AddSetGet<string>()
  public description: string = undefined;
  @AddSetGet<string>()
  public duration: string = undefined;
  @AddSetGet<POSITION>()
  public position: POSITION = undefined;
  @AddSetGet<STATUS_JOB>()
  public status: STATUS_JOB = undefined;
  @AddSetGet<PrivateData>()
  public privateData: PrivateData = undefined;
  @AddSetGet<string[]>()
  public certificates: string[] = [];

  @AddSetGet<SocialLink.ISocialLink[] | ObjectId[]>()
  public link: SocialLink.ISocialLink[] | ObjectId[] = [];
  @AddSetGet<Language.ILanguage[] | ObjectId[]>()
  public languages: Language.ILanguage[] | ObjectId[] = [];
  @AddSetGet<PlaceWork.IPlaceWork[] | ObjectId[]>()
  public place_work: PlaceWork.IPlaceWork[] | ObjectId[] = [];

  @AddSetGet<ObjectId[]>()
  public addLink: ObjectId[] = [];
  @AddSetGet<ObjectId[]>()
  public addLanguages: ObjectId[] = [];
  @AddSetGet<ObjectId[]>()
  public addPlaceWork: ObjectId[] = [];
  @AddSetGet<ObjectId[]>()
  public removeLink: ObjectId[] = [];
  @AddSetGet<ObjectId[]>()
  public removeLanguages: ObjectId[] = [];
  @AddSetGet<ObjectId[]>()
  public removePlaceWork: ObjectId[] = [];

  constructor(data: TEntity) {
    super(data);
    if (data.name) this.name = data.name;
    if (data.userId) this.userId = data.userId;
    if (data.link) this.link = data.link;
    if (data.description) this.description = data.description;
    if (data.status) this.status = data.status;
    if (data.position) this.position = data.position;
    if (data.duration) this.duration = data.duration;

    if (data.privateData) this.privateData = data.privateData;
    if (data.languages) this.languages = data.languages;
    if (data.place_work) this.place_work = data.place_work;
    if (data.certificates) this.certificates = data.certificates;

    if (data.addLink) this.addLink = data.addLink;
    if (data.addLanguages) this.addLanguages = data.addLanguages;
    if (data.addPlaceWork) this.addPlaceWork = data.addPlaceWork;
    if (data.removeLink) this.removeLink = data.removeLink;
    if (data.removeLanguages) this.removeLanguages = data.removeLanguages;
    if (data.removePlaceWork) this.removePlaceWork = data.removePlaceWork;
  }
}
