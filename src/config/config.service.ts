import 'reflect-metadata';
import path from 'path';

import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';
import { inject, injectable } from 'inversify';

import { IConfigService, ENV } from './config.service.interface';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../container/types';

@injectable()
export class ConfigService implements IConfigService {
  private config: DotenvParseOutput & NodeJS.ProcessEnv;

  constructor(@inject(TYPES.ILogger) private logger: ILogger) {
    const result: DotenvConfigOutput | undefined = this.envInit();

    if (!result) {
      this.logger.error('[ConfigService] Failed to read .env file or not find it');
    } else {
      this.logger.log('[ConfigService] Configurations .env file loaded');
      this.config = { ...result.parsed, ...process.env };
    }
  }

  private envInit(): DotenvConfigOutput | undefined {
    try {
      const result: DotenvConfigOutput = config({ path: path.join(__dirname, '../../.env') });
      if (result.error) return {};
      return result;
    } catch {
      this.logger.error('[ConfigService] Failed to read .env file or not find it');
      return {};
    }
  }
  public get(key: ENV): string {
    return this.config[key];
  }

  public getCors(): string[] {
    const CORS_HTTPS = this.get(ENV.CORS_HTTPS);
    const CORS_NETLIFY = this.get(ENV.CORS_NETLIFY);
    const CORS_WWW = this.get(ENV.CORS_WWW);
    const CORS = this.get(ENV.CORS);
    const CORS_ELECTRON = this.get(ENV.CORS_ELECTRON);
    return [CORS, CORS_WWW, CORS_NETLIFY, CORS_HTTPS, CORS_ELECTRON];
  }
}
