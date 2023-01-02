import { AbstractEntity, TEntity, TJsonPayload, TUpdateDB, TUpdateDBLists } from './interface';

/** This class is for working with the `Author`.
 ** And has methods as:
 * @method `jsonPayload()`
 * @method `updateDB()`
 */
export class Entity extends AbstractEntity {
  constructor(data: TEntity) {
    super(data);
  }

  public override jsonPayload = (): TJsonPayload => {
    const {
      id,
      name,
      userId,
      duration,
      description,
      position,
      status,
      link,
      place_work,
      languages,
      privateData,
      certificates,
    } = this;
    return {
      id,
      name,
      userId,
      description,
      link,
      duration,
      place_work,
      position,
      status,
      languages,
      privateData,
      certificates,
    };
  };

  public override updateDB = (): TUpdateDB => {
    const { duration, description, name, position, status } = this;
    return { duration, description, name, position, status };
  };

  public updateDBLists = (): TUpdateDBLists => {
    const { id, addLanguages, addLink, addPlaceWork, removeLanguages, removeLink, removePlaceWork } = this;
    return { userId: id, addLanguages, addLink, addPlaceWork, removeLanguages, removeLink, removePlaceWork };
  };
}
