import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { ObjectId } from 'mongoose';

import { AppContainer } from '../../container';
import { Author } from '../index';
import { TYPES, MongoService } from '../../core';
import { IRepository, ISchema } from './interface';
import { Entity } from './entity';

@injectable()
export class Repository implements IRepository {
  constructor(@inject(TYPES.MongoService) private db: MongoService) {}

  public find = async (entity: Entity): Promise<ISchema | null> => {
    let item: ISchema | null = null;
    if (entity.id) item = await this.db.language.findById(entity.id);
    if (entity.name && entity.userId) {
      item = await this.db.language.findOne({ name: entity.name, userId: entity.userId });
    }
    return item;
  };

  public create = async (entity: Entity): Promise<ISchema> => {
    return await this.db.language.addition(entity);
  };

  public remove = async (entity: Entity): Promise<ISchema | null> => {
    if (!entity.id) return null;
    const item = await this.db.language.findByIdAndRemove(entity.id, { new: true });

    if (item?._id && item._id === entity.id) await this.removeFromAuthor(item);

    return item;
  };

  public update = async (entity: Entity): Promise<ISchema | null> => {
    if (!entity.id) return null;
    const set = entity.updateDB();
    return await this.db.language.findByIdAndUpdate(entity.id, { $set: set }, { new: true }).exec();
  };

  public removeMany = async ({ removeLanguages }: Author.TUpdateDBLists): Promise<boolean> => {
    try {
      await this.db.language.deleteMany({ _id: { $in: removeLanguages } }).exec();
      return true;
    } catch (error) {
      return false;
    }
  };

  private removeFromAuthor = async ({ id, userId }: ISchema): Promise<void> => {
    const authorEntity = new Author.Entity({ removeLanguages: [id as ObjectId] });
    authorEntity.id = userId;
    const authorRep = AppContainer.get<Author.IRepository>(Author.TYPES.Repository);
    await authorRep.removeItems(authorEntity);
  };
}
