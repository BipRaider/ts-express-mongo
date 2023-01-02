import { ConnectOptions } from 'mongoose';

export interface IOptions extends ConnectOptions {
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
  autoIndex: boolean;
}

export enum DB_Module {
  USER = 'user',
  USERS = 'users',
  AUTHOR = 'author',
  AUTHORS = 'authors',
  LANGUAGES = 'languages',
  LANGUAGE = 'language',
  PLACE_WORKS = 'placeWorks',
  PLACE_WORK = 'placeWork',
  SOCIAL = 'social',
  SOCIALS = 'socials',
}

/**
 ** Sort descending `-1`, `desc`, `descending`
 ** Sort ascending `1 `, `asc`, `ascending`
 */
export enum ESortDB {
  asc = 'asc',
  desc = 'desc',
  ascending = 'ascending',
  descending = 'descending',
  once = 1,
  minusOnce = -1,
}
