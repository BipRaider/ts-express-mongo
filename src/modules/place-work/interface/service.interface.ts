import { CreateDto, GetDto, RemoveDto, UpdateDto } from '../dto';
import { Entity } from '../entity';

export interface IService {
  /*** Working with `PlaceWorkRepository` and returns values from database
   * @param dto - receives the value `CreateDto` from `req.body` to work with the `place work`
   * @return  `Entity` or `null`
   */
  create: (dto: CreateDto) => Promise<Entity | null>;
  /*** Update place work by `id` to database
   * @param  dto - receives `UpdateDto`
   * @return `Entity`
   */
  update: (dto: UpdateDto) => Promise<Entity | null>;
  /*** Find place work by `id` to database
   * @param  dto - receives `GetDto`
   * @return `Entity`
   */
  find: (dto: GetDto) => Promise<Entity | null>;
  /*** Delete place work by `id` to database
   * @param  dto - receives `RemoveDto`
   * @return `Entity`
   */
  remove: (dto: RemoveDto) => Promise<Entity | null>;
}
