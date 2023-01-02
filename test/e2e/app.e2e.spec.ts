import 'reflect-metadata';
import { beforeAll, describe, test, expect } from '@jest/globals';

import { query } from '../server';

describe('App e2e', () => {
  let accessToken = '';

  beforeAll(async () => {
    const res = await query('/users/login', 'post', { email: 'the1@1.com', password: '123456789' });
    const { body } = res;
    const { payload } = body;
    accessToken = payload.accessToken;
  });

  describe('Error if page not found', () => {
    describe('Random', () => {
      test('error', async () => {
        const url = 'dasdggasdasdasdsad';
        const id = 'asd';
        const res = await query(`/${url}/${id}`, 'get', {}, accessToken);
        const { statusCode } = res;
        expect(statusCode).toBe(404);
      });
    });
    describe('About', () => {
      test('error', async () => {
        const url = 'about';
        const id = '';
        const res = await query(`/${url}/${id}`, 'get', {}, accessToken);
        const { statusCode } = res;
        expect(statusCode).toBe(404);
      });
    });

    describe('User', () => {
      test('error', async () => {
        const url = 'users';
        const id = '';
        const res = await query(`/${url}/${id}`, 'get', {}, accessToken);
        const { statusCode } = res;
        expect(statusCode).toBe(404);
      });
    });
    describe('Skill', () => {
      test('error', async () => {
        const url = 'skill';
        const id = '';
        const res = await query(`/${url}/${id}`, 'get', {}, accessToken);
        const { statusCode } = res;
        expect(statusCode).toBe(404);
      });
    });
    describe('Library', () => {
      test('error', async () => {
        const url = 'about';
        const id = '';
        const res = await query(`/${url}/${id}`, 'get', {}, accessToken);
        const { statusCode } = res;
        expect(statusCode).toBe(404);
      });
    });
    describe('Social link', () => {
      test('error', async () => {
        const url = 'social';
        const id = '';
        const res = await query(`/${url}/${id}`, 'get', {}, accessToken);
        const { statusCode } = res;
        expect(statusCode).toBe(404);
      });
    });
    describe('Language', () => {
      test('error', async () => {
        const url = 'language';
        const id = '';
        const res = await query(`/${url}/${id}`, 'get', {}, accessToken);
        const { statusCode } = res;
        expect(statusCode).toBe(404);
      });
    });
    describe('Project work', () => {
      test(' error', async () => {
        const url = 'place-work';
        const id = '';
        const res = await query(`/${url}/${id}`, 'get', {}, accessToken);
        const { statusCode } = res;
        expect(statusCode).toBe(404);
      });
    });
  });
});
