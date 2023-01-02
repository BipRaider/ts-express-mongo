import { Author } from '../../index';

import { Entity } from '../entity';
import { ISchema } from './model.interface';

export interface IRepository {
  /*** Add place work to database
   * @param  entity - receives `Entity`
   */
  create: (entity: Entity) => Promise<ISchema>;
  /*** Find place work by `name` or `id`
   * @param  entity - receives `Entity` and should have: `name` or `id`
   */
  find: (entity: Entity) => Promise<ISchema | null>;
  /*** Update place work to database
   * @param  entity - receives `Entity`
   * @return `IPlaceWorkSchema` or `null`
   */
  update: (entity: Entity) => Promise<ISchema | null>;
  /*** Replace work to database
   * @param  entity - receives `Entity`
   * @return `IPlaceWorkSchema` or `null`
   */
  remove: (entity: Entity) => Promise<ISchema | null>;
  /*** Remove the data by `userId` of the module from database
   * @param  payload - receives `Author.Entity.updateDBLists()`
   */
  removeMany: (payload: Author.TUpdateDBLists) => Promise<boolean>;
}
