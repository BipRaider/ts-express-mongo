import 'reflect-metadata';
import { inject, injectable } from 'inversify';

import { TYPES, MongoService } from '../../core';
import { Language, SocialLink, PlaceWork } from '../index';
import { IRepository, ISchema } from './interface';
import { Entity } from './entity';

@injectable()
export class Repository implements IRepository {
  constructor(
    @inject(TYPES.MongoService) private db: MongoService,
    @inject(SocialLink.TYPES.Repository) private socialLinkRepository: SocialLink.Repository,
    @inject(Language.TYPES.Repository) private languageRepository: Language.Repository,
    @inject(PlaceWork.TYPES.Repository) private placeWorkRepository: PlaceWork.Repository,
  ) {}

  public find = async (entity: Entity): Promise<ISchema | null> => {
    let item: ISchema | null = null;

    if (entity.id) item = await this.db.author.findById(entity.id);
    if (entity.userId && !item) item = await this.db.author.findOne({ userId: entity.userId });
    if (entity.name && !item) item = await this.db.author.findOne({ name: entity.name });

    return item;
  };

  public create = async (entity: Entity): Promise<ISchema> => await this.db.author.addition(entity);
  public remove = async (entity: Entity): Promise<ISchema | null> => {
    if (!entity.id) return null;
    return await this.db.author.findByIdAndRemove(entity.id, { new: true });
  };

  public update = async (entity: Entity): Promise<ISchema | null> => {
    if (!entity.id) return null;
    const set = entity.updateDB();

    await this.removeItems(entity);

    return await this.db.author
      .findByIdAndUpdate(
        entity.id,
        {
          $set: set,
          $addToSet: {
            link: entity.addLink,
            languages: entity.addLanguages,
            place_work: entity.addPlaceWork,
          },
        },
        { new: true },
      )
      .exec();
  };

  public removeItems = async (entity: Entity): Promise<boolean> => {
    if (!entity.id) return false;
    if (entity.removeLink.length || entity.removeLanguages.length || entity.removePlaceWork.length) {
      await this.db.author
        .findByIdAndUpdate(entity.id, {
          $pullAll: {
            link: entity.removeLink,
            languages: entity.removeLanguages,
            place_work: entity.removePlaceWork,
          },
        })
        .exec();

      let link = null;
      let languages = null;
      let place_work = null;

      if (entity.removeLink.length) link = this.socialLinkRepository.removeMany(entity.updateDBLists());
      if (entity.removeLanguages.length) languages = this.languageRepository.removeMany(entity.updateDBLists());
      if (entity.removePlaceWork.length) place_work = this.placeWorkRepository.removeMany(entity.updateDBLists());

      await Promise.all([link, languages, place_work]);
      return true;
    }
    return false;
  };
}
