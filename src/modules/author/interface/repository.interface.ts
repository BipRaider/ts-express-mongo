import { Entity } from '../entity';
import { ISchema } from './model.interface';

export interface IRepository {
  /*** Add author to database
   * @param  entity - receives `Entity`
   */
  create: (entity: Entity) => Promise<ISchema>;
  /*** Find author by `name` or `id` or `userId`
   * @param  entity - receives `Entity` and should have: `name` or `id`
   */
  find: (entity: Entity) => Promise<ISchema | null>;
  /*** Update author to database
   * @param  entity - receives `Entity`
   * @return `ISchema` or `null`
   */
  update: (entity: Entity) => Promise<ISchema | null>;
  /*** Remove author to database
   * @param  entity - receives `Entity`
   * @return `ISchema` or `null`
   */
  remove: (entity: Entity) => Promise<ISchema | null>;
  /*** Remove the items form the author to database
   * @param  entity - receives `Entity`
   * @return `boolean`
   */
  removeItems: (entity: Entity) => Promise<boolean>;
}
