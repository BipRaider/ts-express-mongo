import { CreateDto, GetDto, RemoveDto, UpdateDto, GetByUserIDDto } from '../dto';
import { Entity } from '../entity';

export interface IService {
  /*** Working with `Repository` and returns values from database
   * @param dto - receives the value `CreateDto` from `req.body` to work with the `author`
   * @return  `Entity` or `null`
   */
  create: (dto: CreateDto) => Promise<Entity | null>;
  /*** Update author by `id` to database
   * @param  dto - receives `UpdateDto`
   * @return `Entity`
   */
  update: (dto: UpdateDto) => Promise<Entity | null>;
  /*** Find author by `id` to database
   * @param  dto - receives `GetDto`
   * @return `Entity`
   */
  find(dto: GetByUserIDDto): Promise<Entity | null>;
  find(dto: GetDto): Promise<Entity | null>;
  /*** Delete author by `id` to database
   * @param  dto - receives `RemoveDto`
   * @return `Entity`
   */
  remove: (dto: RemoveDto) => Promise<Entity | null>;
}
