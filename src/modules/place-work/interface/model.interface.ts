import { Document, Model, ObjectId } from 'mongoose';

import { Entity } from '../entity';

export interface IPlaceWork {
  /** The name company */
  name: string;
  /** Description of work in the company*/
  description: string;
  /** Link to the company */
  link: string;
  /** When start to work*/
  start_duration: string;
  /** When start to end*/
  end_duration: string;
  /** What position has the author */
  position: string;
  /** Job status */
  status: boolean;
  /** ID of the user who owns */
  userId: ObjectId;
}
/*** The `PlaceWork` schema for database */
export interface ISchema extends Document<ObjectId | string>, IPlaceWork {
  id?: string | ObjectId;
  readonly create_at?: Date;
  readonly update_at?: Date;
}

/*** The properties of the `PlaceWork` */
export type TPlaceWork = Pick<ISchema, '_id' | 'id' | 'create_at' | 'update_at'> & IPlaceWork;

/*** The `PlaceWork` schema for database */
export type Instance = ISchema;

/*** The `PlaceWork` model for database */
export interface IModel extends Model<Instance> {
  /*** Method for adding `PlaceWork` to database
   * @param  entity - receives `Entity`
   */
  addition: (entity: Entity) => Promise<Instance>;
}
