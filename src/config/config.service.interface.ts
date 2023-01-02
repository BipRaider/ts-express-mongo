export enum ENV {
  CORS = 'CORS',
  CORS_HTTPS = 'CORS_HTTPS',
  CORS_WWW = 'CORS_WWW',
  DATABASE_URL = 'DATABASE_URL',
  EMAIL_API_KEY = 'EMAIL_API_KEY',
  EMAIL_USER = 'EMAIL_USER',
  NEW_RELIC_LICENSE_KEY = 'NEW_RELIC_LICENSE_KEY',
  NEW_RELIC_LOG = 'NEW_RELIC_LOG',
  SALT = 'SALT',
  SECRET = 'SECRET',
  PORT = 'PORT',
  RATE_LIMIT = 'RATE_LIMIT',
  RATE_TIME = 'RATE_TIME',
  CORS_ELECTRON = 'CORS_ELECTRON',
  NODE_ENV = 'NODE_ENV',
}

export interface IConfigService {
  /*** Get a property from `.env` and `process.env`*/
  get: (key: ENV) => string;
  getCors: () => string[];
}

export interface Dictionary<V = string> {
  [key: string]: V;
}
