import crypto from 'crypto';
import { promisify } from 'util';
import { StatusCodes } from 'http-status-codes';

import { HTTPError } from '../errors/http-error.class';

export const PasswordLength = 99;
export const SaltLen = 22;
export const Iterations = 5000;
export const Digest = 'sha512';
export const PassLong = 11;

export const createPassword = (long?: number): string =>
  crypto
    .randomBytes(long || PassLong)
    .toString('hex')
    .slice(0, long || PassLong)
    .toUpperCase();

export const hashPassword = async (password: string, salt?: string): Promise<string> => {
  salt = salt || crypto.randomBytes(SaltLen).toString('hex').slice(0, SaltLen);
  const hash = await promisify(crypto.pbkdf2)(password, salt, Iterations, PasswordLength, Digest);

  return [salt, Iterations.toString(), hash.toString('hex')].join('.');
};

export const checkPassword = async (hashed: string, password: string): Promise<boolean> => {
  try {
    const [salt, iterations, hash] = hashed.split('.');

    if (!iterations || !hash) return false;

    const checkHashed = await hashPassword(password, salt);

    if (checkHashed !== hashed) return false;

    return true;
  } catch (error) {
    throw new HTTPError(StatusCodes.UNAUTHORIZED, 'Credentials invalid', 'checkPassword');
  }
};
