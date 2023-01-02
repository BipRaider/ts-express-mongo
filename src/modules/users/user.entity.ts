import { hashPassword, checkPassword } from '../../core';
import { TEntity, AbstractEntity } from './interface';

export class UserEntity extends AbstractEntity {
  constructor(data: TEntity) {
    super(data);
  }

  public async setPassword(pass: string): Promise<void> {
    this.password = await hashPassword(pass);
  }

  public async verifyPassword(password: string): Promise<boolean | never> {
    return await checkPassword(this.password, password);
  }
}
