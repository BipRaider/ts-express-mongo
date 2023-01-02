import 'reflect-metadata';
import mongoose, { Connection } from 'mongoose';
import { inject, injectable } from 'inversify';

import { User, Author, Language, PlaceWork, SocialLink, ENV, IConfigService, TYPES, ILogger } from '../core';

import { IOptions } from './mongo.interface';

/*** Connecting and working with the `mongodb` database.
 ** And has methods and getters as:
 * @method `connect()` for connect to the `mongodb` database
 * @method `disconnect()` for disconnect from the `mongodb` database
 * @getter `user` for work with `UserModel` from database
 * @getter `author` for work with `AuthorModel` from database
 * @getter `language` from work with `LanguageModule` from database
 * @getter `placeWork` from work with `PlaceWorkModel` from database
 * @getter `social` from work with `SocialModel` from database
 */
@injectable()
export class MongoService {
  private client: typeof mongoose;
  private db: Connection;
  private url: string;
  private options: IOptions;

  private _user: User.IUserModel;
  private _author: Author.IModel;
  private _language: Language.IModel;
  private _placeWork: PlaceWork.IModel;
  private _social: SocialLink.IModel;

  constructor(
    @inject(TYPES.ILogger) private logger: ILogger,
    @inject(TYPES.ConfigService) private configService: IConfigService,
  ) {
    this.client = mongoose;
    this.url = this.configService.get(ENV.DATABASE_URL) ?? 'mongodb://localhost:27017';

    this.options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true,
    };
    this._user = User.UserModel;
    this._author = Author.Model;
    this._language = Language.Model;
    this._social = SocialLink.Model;
    this._placeWork = PlaceWork.Model;
  }
  /*** Connect to the `mongodb` database */
  async connect(): Promise<void> {
    try {
      await this.client.connect(this.url, this.options);

      this.db = this.client.connection;

      this.logger.log(`[MongoDBService] MongoDB Connected: ${this.client.connection.host}`);

      this.db.on('connecting', (): void => {
        this.logger.log(`[MongoDBService] connecting to MongoDB...`);
      });

      this.db.on('connected', (): void => {
        this.logger.log(`[MongoDBService] MongoDB connected!`);
      });

      this.db.on('reconnected', (): void => {
        this.logger.log(`[MongoDBService] MongoDB connected!`);
      });

      this.db.once('open', (): void => {
        this.logger.log(`[MongoDBService] MongoDB connected!`);
      });

      this.db.on('disconnected', (): void => {
        this.logger.log(`[MongoDBService] MongoDB connected!`);
        setTimeout(async (): Promise<void> => {
          await this.client.connect(this.url, this.options);
        }, 5000);
      });

      this.db.on('error', async (error: Error): Promise<void> => {
        this.logger.error(`[MongoDBService] Failed to connect database via mongo: ${error.message} `);
        await this.disconnect();
      });
    } catch (e) {
      if (e instanceof Error) {
        this.logger.error('[MongoDBService] Failed to connect database via mongo: ' + e.message);
        setTimeout(async (): Promise<void> => {
          await this.client.connect(this.url, this.options);
        }, 5000);
      }
    }
  }

  /*** Disconnect from the `mongodb` database */
  async disconnect(): Promise<void> {
    await this.client.disconnect();
  }
  /** Works with `UserModel` from mongodb database */
  get user(): User.IUserModel {
    return this._user;
  }
  /** Works with `AuthorModel` from mongodb database */
  get author(): Author.IModel {
    return this._author;
  }
  /** Works with `LanguageModel` from mongodb database */
  get language(): Language.IModel {
    return this._language;
  }
  /** Works with `PlaceWorkModel` from mongodb database */
  get placeWork(): PlaceWork.IModel {
    return this._placeWork;
  }
  /** Works with `SocialModel` from mongodb database */
  get social(): SocialLink.IModel {
    return this._social;
  }
}
