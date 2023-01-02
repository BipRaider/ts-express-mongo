export interface IService {
  set: <T>(key: string, value: T) => Promise<void>;
  get: <T>(key: string) => Promise<T>;
  delete: (key: string) => Promise<void>;
  init: () => Promise<void>;
}

export const TYPES = {
  CacherService: Symbol.for('CacherService'),
};
