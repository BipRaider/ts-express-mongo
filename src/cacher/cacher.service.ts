import 'reflect-metadata';
import { injectable } from 'inversify';
import { caching, MemoryCache } from 'cache-manager';

import { IService } from './cacher.interface';

@injectable()
export class Service implements IService {
  private memory: MemoryCache;

  public init = async (): Promise<void> => {
    this.memory = await caching('memory', {
      max: 500,
      ttl: 5 * 1000 /*miliseconds*/,
    });
  };

  public set = async <T>(key: string, payload: T): Promise<void> => {
    await this.memory.set(key, payload);
  };
  public get = async <T>(key: string): Promise<T> => {
    return await this.memory.get(key);
  };
  public delete = async (key: string): Promise<void> => {
    await this.memory.del(key);
  };
}
