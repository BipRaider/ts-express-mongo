import { Document, Model, ObjectId } from 'mongoose';

import { Entity } from '../entity';

export enum LANGUAGES_LEVEL {
  Native = 'native',
  C2 = 'proficient',
  C1 = 'advanced',
  B2 = 'upper-intermediate',
  B1 = 'intermediate',
  A2 = 'pre-intermediate',
  A1 = 'elementary',
  Beginner = 'beginner',
}

export interface ILanguage {
  /** Language name */
  name: string;
  /** Level of knowledge */
  level: LANGUAGES_LEVEL;
  /** ID of the user who owns */
  userId: ObjectId;
}

/*** The `Language` schema for database */
export interface ISchema extends Document<ObjectId | string>, ILanguage {
  id?: string | ObjectId;
  readonly create_at?: Date;
  readonly update_at?: Date;
}
/*** The properties of the `Language` */
export type TLanguage = Pick<ISchema, '_id' | 'id' | 'create_at' | 'update_at'> & ILanguage;
/*** The `Language` schema for database */
export type Instance = ISchema;
/*** The `Language` model for database */
export interface IModel extends Model<Instance> {
  /*** Method for adding data to database.
   * @param  entity - receives `Entity`
   */
  addition: (entity: Entity) => Promise<Instance>;
}
