import { AbstractEntity, ISchema, TJsonPayload, TUpdateDB } from './interface';

/** This class is for working with the `PlaceWork`.
 ** And has methods as:
 * @method `jsonPayload()`
 * @method `updateDB()`
 */
export class Entity extends AbstractEntity {
  constructor(data: Partial<ISchema>) {
    super(data);
  }

  public override jsonPayload = (): TJsonPayload => {
    const { id, link, description, name, position, status, end_duration, start_duration, userId } = this;
    return { id, link, description, name, position, status, end_duration, start_duration, userId };
  };

  public override updateDB = (): TUpdateDB => {
    const { description, name, link, position, status, end_duration, start_duration } = this;
    return { description, name, link, position, status, end_duration, start_duration };
  };
}
