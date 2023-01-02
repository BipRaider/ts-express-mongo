import 'reflect-metadata';
import { inject, injectable } from 'inversify';

import { TYPES } from '.';

import { Entity } from './entity';
import { IRepository, ISchema, IService } from './interface';
import { RemoveDto, UpdateDto, CreateDto, GetDto, GetByUserIDDto } from './dto';

@injectable()
export class Service implements IService {
  constructor(@inject(TYPES.Repository) private repository: IRepository) {}

  public create = async (dto: CreateDto): Promise<Entity | null> => {
    try {
      if (!dto.userId) return null;
      const entity = new Entity(dto);
      const existed = await this.repository.find(entity);
      if (existed) return null;
      const data = await this.repository.create(entity);
      return new Entity(data);
    } catch {
      return null;
    }
  };

  public find = async (dto: GetDto | GetByUserIDDto): Promise<Entity | null> => {
    try {
      if (dto instanceof GetDto && !dto.id) return null;
      if (dto instanceof GetByUserIDDto && !dto.userId) return null;

      const entity: Entity = new Entity(dto);
      const data = await this.repository.find(entity);
      if (!data) return null;
      return new Entity(data);
    } catch {
      return null;
    }
  };

  public update = async (dto: UpdateDto): Promise<Entity | null> => {
    try {
      if (!dto.id) return null;
      const entity: Entity = new Entity(dto);
      const data: ISchema = await this.repository.update(entity);
      if (!data) return null;
      return new Entity(data);
    } catch (error) {
      return null;
    }
  };

  public remove = async (dto: RemoveDto): Promise<Entity | null> => {
    if (!dto.id) return null;
    const entity: Entity = new Entity(dto);
    const data: ISchema = await this.repository.remove(entity);
    if (!data) return null;
    return new Entity(data);
  };
}
