import { Document, Model, ObjectId } from 'mongoose';

import { Language, PlaceWork, SocialLink } from '../../index';
import { POSITION, STATUS_JOB } from './enum';
import { Entity } from '../entity';

export interface PrivateData {
  firstname: string;
  lastname: string;
  photo: string;
  phone: string;
  email: string;
  address: string;
}

export interface IAuthor {
  /** Author name */
  name: string;
  /** ID of the user who owns */
  userId: ObjectId;
  /** Author's description */
  description: string;
  /** Author time of work */
  duration: string;
  /** What position has the author */
  position: POSITION;
  /** Author job status */
  status: STATUS_JOB;
  /** List private data about the author */
  privateData: PrivateData;
  /** List certificates */
  certificates: string[];
  /** List links to social network */
  link: SocialLink.ISocialLink[] | ObjectId[];
  /** List of languages the author knows */
  languages: Language.ILanguage[] | ObjectId[];
  /** Where the author was worked */
  place_work: PlaceWork.IPlaceWork[] | ObjectId[];
}
/*** The `Author` schema for database */
export interface ISchema extends Document<ObjectId | string>, IAuthor {
  id?: string | ObjectId;
  readonly create_at?: Date;
  readonly update_at?: Date;
}
/*** The properties of the `Author` */
export type TAuthor = Pick<ISchema, '_id' | 'id' | 'create_at' | 'update_at'> & IAuthor;
/*** The `About` schema for database */
export type Instance = ISchema;
/*** The `About` model for database */
export interface IModel extends Model<Instance> {
  /*** Method for adding `Author` to database
   * @param  entity - receives `AuthorEntity`
   */
  addition: (entity: Entity) => Promise<Instance>;
}
