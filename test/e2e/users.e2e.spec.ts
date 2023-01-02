import 'reflect-metadata';
import { beforeAll, describe, test, expect } from '@jest/globals';

import { query } from '../server';

describe('User e2e', () => {
  let accessToken: string;

  describe('Register', () => {
    describe('Dto is not corrected data', () => {
      let IsNotCorrectDate = {
        password: 1,
        email: 1,
        name: 1,
        message: 1,
      };

      let statusCode;
      let body;
      let payload;
      let errors;

      beforeAll(async () => {
        const res = await query('/users/register', 'post', IsNotCorrectDate);
        statusCode = res.statusCode;
        body = res.body;
        payload = body.payload;
        errors = body.payload.errors;
      });

      test('status code and status', async () => {
        expect(statusCode).toBe(422);
        expect(body.status).toEqual(false);
      });
      test('errors defined', async () => {
        expect(payload.errors).toBeDefined();
      });
      test('email - incorrect', async () => {
        const e = errors[0];
        const data = {
          value: 1,
          property: 'email',
          errorList: { isEmail: 'The email is incorrect' },
        };
        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);
        expect(e.errorList.isEmail).toBeDefined();
        expect(e.errorList.isEmail).toEqual(data.errorList.isEmail);
      });
      test('password - incorrect', async () => {
        const e = errors[1];
        const data = {
          value: 1,
          property: 'password',
          errorList: {
            isString: 'The password is incorrect',
          },
        };
        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);
        expect(e.errorList.isString).toBeDefined();
        expect(e.errorList.isString).toEqual(data.errorList.isString);
      });
      test('name - incorrect', async () => {
        const e = errors[2];
        const data = {
          value: 1,
          property: 'name',
          errorList: {
            isString: 'The name is incorrect',
            isLength: 'name must be longer than or equal to 3 and shorter than or equal to 20 characters',
          },
        };
        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);
        expect(e.errorList.isString).toBeDefined();
        expect(e.errorList.isLength).toBeDefined();
        expect(e.errorList.isString).toEqual(data.errorList.isString);
        expect(e.errorList.isLength).toEqual(data.errorList.isLength);
      });
      test('message - incorrect', async () => {
        const e = errors[3];
        const data = {
          value: 1,
          property: 'message',
          errorList: {
            isString: 'The message is incorrect',
            isLength: 'message must be longer than or equal to 3 and shorter than or equal to 300 characters',
          },
        };
        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);
        expect(e.errorList.isString).toBeDefined();
        expect(e.errorList.isLength).toBeDefined();
        expect(e.errorList.isString).toEqual(data.errorList.isString);
        expect(e.errorList.isLength).toEqual(data.errorList.isLength);
      });
    });

    test('Register - error', async () => {
      const data = {
        status: false,
        payload: {
          status: 422,
          defaultMessage: 'Unprocessable Entity',
          message: 'This user exists',
        },
      };

      const res = await query('/users/register', 'post', {
        password: '123456789',
        email: 'the@gmail.com',
        name: 'User',
        message: 'TEST MESAGE',
      });

      const { body } = res;
      const { payload } = body;

      expect(body.status).toEqual(data.status);
      expect(payload.status).toEqual(422);
      expect(payload.defaultMessage).toEqual(data.payload.defaultMessage);
      expect(payload.message).toEqual(data.payload.message);
    });
  });

  describe('Login', () => {
    test('error is not corrected data', async () => {
      const data = {
        status: false,
        payload: {
          errors: [
            {
              value: 1,
              property: 'email',
              errorList: {
                isEmail: 'The email is incorrect',
              },
            },
            {
              value: 1,
              property: 'password',
              errorList: {
                isString: 'The password is incorrect',
              },
            },
          ],
        },
      };

      const res = await query('/users/login', 'post', { email: 1, password: 1 });

      const { body, statusCode } = res;
      expect(statusCode).toBe(422);
      expect(body.status).toBeDefined();
      expect(body.status).toEqual(data.status);

      const { payload } = body;
      expect(payload).toBeDefined();

      const { errors } = payload;
      expect(errors[0].value).toEqual(data.payload.errors[0].value);
      expect(errors[0].property).toEqual(data.payload.errors[0].property);
      expect(errors[0].errorList.isString).toEqual(data.payload.errors[0].errorList.isString);
      expect(errors[1].value).toEqual(data.payload.errors[1].value);
      expect(errors[1].property).toEqual(data.payload.errors[1].property);
      expect(errors[1].errorList.isString).toEqual(data.payload.errors[1].errorList.isString);
    });
    test('error', async () => {
      const data = {
        status: false,
        payload: {
          status: 401,
          defaultMessage: 'Unauthorized',
          message: 'Error authorization',
        },
      };

      const res = await query('/users/login', 'post', { email: 'a33@a.com', password: '1333333' });

      const { body, statusCode } = res;
      const { payload } = body;

      expect(statusCode).toBe(401);
      expect(body.status).toEqual(data.status);
      expect(body.status).toBeDefined();
      expect(payload.status).toBeDefined();
      expect(payload.defaultMessage).toBeDefined();
      expect(payload.message).toBeDefined();
      expect(payload.defaultMessage).toEqual(data.payload.defaultMessage);
      expect(payload.status).toEqual(data.payload.status);
      expect(payload.message).toEqual(data.payload.message);
    });
    test('success', async () => {
      const data = {
        status: true,
        payload: {
          accessToken: 'something',
          private: true,
          admin: true,
          name: 'ADMIN',
        },
      };

      const res = await query('/users/login', 'post', { email: 'the1@1.com', password: '123456789' });

      const { body, statusCode } = res;
      const { payload } = body;

      expect(statusCode).toBe(200);
      expect(body.status).toEqual(data.status);
      expect(payload.accessToken).toBeDefined();
      expect(payload.accessToken.length).toBeGreaterThan(30);
      expect(payload.private).toEqual(data.payload.private);
      expect(payload.admin).toEqual(data.payload.admin);
      expect(payload.name).toEqual(data.payload.name);

      accessToken = payload.accessToken;
    });
  });

  describe('Refresh', () => {
    test('error', async () => {
      const data = {
        status: false,
        payload: {
          status: 401,
          defaultMessage: 'Unauthorized',
          message: 'Unauthorized',
        },
      };

      const res = await query('/users/refresh', 'get', {}, 'Unauthorized access token');
      const { body, statusCode } = res;
      const { payload } = body;

      expect(statusCode).toBe(401);
      expect(body.status).toEqual(data.status);
      expect(body.status).toBeDefined();
      expect(payload.status).toBeDefined();
      expect(payload.defaultMessage).toBeDefined();
      expect(payload.message).toBeDefined();
      expect(payload.defaultMessage).toEqual(data.payload.defaultMessage);
      expect(payload.status).toEqual(data.payload.status);
      expect(payload.message).toEqual(data.payload.message);
    });

    test('success', async () => {
      const data = {
        status: true,
        payload: {
          accessToken: 'something',
          private: true,
          admin: true,
          name: 'ADMIN',
        },
      };

      const res = await query('/users/refresh', 'get', {}, accessToken);
      const { body, statusCode } = res;
      const { payload } = body;

      expect(statusCode).toBe(200);
      expect(body.status).toEqual(data.status);
      expect(payload.accessToken).toBeDefined();
      expect(payload.accessToken.length).toBeGreaterThan(30);
      expect(payload.private).toEqual(data.payload.private);
      expect(payload.admin).toEqual(data.payload.admin);
      expect(payload.name).toEqual(data.payload.name);
    });
  });
});
