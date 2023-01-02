import { Document, Model, ObjectId } from 'mongoose';

import { Entity } from '../entity';

export enum SOCIAL {
  Telegram = 'Telegram',
  GitHab = 'GitHab',
  GitLab = 'GitLab',
  Linkedin = 'Linkedin',
  Skype = 'Skype',
  Instagram = 'Instagram',
  Facebook = 'Facebook',
  Viber = 'Viber',
  Signal = 'Signal',
  WhatsApp = 'WhatsApp',
  Twitter = 'twitter',
  Apple = 'apple',
}

export interface ISocialLink {
  /** Sociol network name */
  name: SOCIAL;
  /** Link to the sociol network */
  link: string;
  /** ID of the user who owns */
  userId: ObjectId;
}

/*** The `Social link` schema for database */
export interface ISchema extends Document<ObjectId | string>, ISocialLink {
  id?: string | ObjectId;
  readonly create_at?: Date;
  readonly update_at?: Date;
}
/*** The properties of the `Social link` */
export type TSociolLink = Pick<ISchema, '_id' | 'id' | 'create_at' | 'update_at'> & ISocialLink;
/*** The `Social link` schema for database */
export type Instance = ISchema;
/*** The `Social link` model for database */
export interface IModel extends Model<Instance> {
  /*** Method for adding data to database.
   * @param  entity - receives `Entity`
   */
  addition: (entity: Entity) => Promise<Instance>;
}
