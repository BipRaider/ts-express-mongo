import { AbstractEntity, ISchema, TJsonPayload, TUpdateDB } from './interface';

/** This class is for working with the data entity of the module.
 ** And has methods as:
 * @method `jsonPayload()`
 * @method `updateDB()`
 */
export class Entity extends AbstractEntity {
  constructor(data: Partial<ISchema>) {
    super(data);
  }

  public override jsonPayload = (): TJsonPayload => {
    return { id: this.id, name: this.name, level: this.level, userId: this.userId };
  };

  public override updateDB = (): TUpdateDB => {
    const { level } = this.jsonPayload();
    return { level };
  };
}
