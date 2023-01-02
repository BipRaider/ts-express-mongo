import { Author } from '../../index';

import { Entity } from '../entity';
import { ISchema } from './model.interface';

export interface IRepository {
  /*** Add data for module to database
   * @param  entity - receives `Entity`
   */
  create: (entity: Entity) => Promise<ISchema>;
  /*** Find module data by `name` or `id`
   * @param  entity - receives `Entity` and should have: `name` or `id`
   */
  find: (entity: Entity) => Promise<ISchema | null>;
  /*** Update module data in database
   * @param  entity - receives `Entity`
   */
  update: (entity: Entity) => Promise<ISchema | null>;
  /*** Remove the data of module from database
   * @param  entity - receives `Entity`
   */
  remove: (entity: Entity) => Promise<ISchema | null>;
  /*** Remove the data by `userId` of the module from database
   * @param  payload - receives `Author.Entity.updateDBLists()`
   */
  removeMany: (payload: Author.TUpdateDBLists) => Promise<boolean>;
}
