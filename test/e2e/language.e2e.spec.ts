import 'reflect-metadata';
import { beforeAll, describe, test, expect } from '@jest/globals';

import { query } from '../server';

describe('Language e2e', () => {
  const url = 'language';
  let id: string = '';
  let accessToken: string;

  const send = {
    name: 'TEST_lang',
    level: 'elementary',
    userId: '6377b287caae55d58a5587d6',
  };

  const sendUpdate = {
    level: 'native',
  };

  const isNotCorrectId = '136669aea50606b8f5765d1_BAD_Id';

  beforeAll(async () => {
    const res = await query('/users/login', 'post', { email: 'the1@1.com', password: '123456789' });
    const { body } = res;
    const { payload } = body;
    accessToken = payload.accessToken;
  }, 1000);

  describe('Create', () => {
    describe('Dto is not corrected data', () => {
      let IsNotCorrectDate = {};

      let statusCode;
      let body;
      let payload;
      let errors;

      beforeAll(async () => {
        const res = await query(`/${url}/create`, 'post', IsNotCorrectDate, accessToken);
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
      test('userId - incorrect', async () => {
        const e = errors[0];
        const data = {
          value: undefined,
          property: 'userId',
          errorList: {
            isMongoId: 'The userId is incorrect',
            isString: 'The userId is incorrect',
            isNotEmpty: 'The userId necessarily is required',
          },
        };
        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);
        expect(e.errorList.isNotEmpty).toBeDefined();
        expect(e.errorList.isNotEmpty).toEqual(data.errorList.isNotEmpty);
        expect(e.errorList.isString).toBeDefined();
        expect(e.errorList.isString).toEqual(data.errorList.isString);
        expect(e.errorList.isMongoId).toBeDefined();
        expect(e.errorList.isMongoId).toEqual(data.errorList.isMongoId);
      });
      test('name - incorrect', async () => {
        const e = errors[1];
        const data = {
          value: undefined,
          property: 'name',
          errorList: {
            isString: 'The name is incorrect',
            isNotEmpty: 'The name necessarily is required',
          },
        };

        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);
        expect(e.errorList.isNotEmpty).toBeDefined();
        expect(e.errorList.isNotEmpty).toEqual(data.errorList.isNotEmpty);
        expect(e.errorList.isString).toBeDefined();
        expect(e.errorList.isString).toEqual(data.errorList.isString);
      });
      test('level - incorrect', async () => {
        const e = errors[2];
        const data = {
          value: undefined,
          property: 'level',
          errorList: {
            isEnum:
              'The level is incorrect and should have: native,proficient,advanced,upper-intermediate,intermediate,pre-intermediate,elementary,beginner',
            isNotEmpty: 'The level necessarily is required',
          },
        };
        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);
        expect(e.errorList.isNotEmpty).toBeDefined();
        expect(e.errorList.isNotEmpty).toEqual(data.errorList.isNotEmpty);

        expect(e.errorList.isEnum).toBeDefined();
        expect(e.errorList.isEnum).toEqual(data.errorList.isEnum);
      });
    });

    test('error is not auth', async () => {
      const data = {
        status: false,
        payload: {
          status: 401,
          defaultMessage: 'Unauthorized',
          message: 'Unauthorized',
        },
      };

      const res = await query(`/${url}/create`, 'post', send);

      const { body, statusCode } = res;
      const { payload } = body;

      expect(statusCode).toBe(401);
      expect(body.status).toEqual(data.status);
      expect(payload.status).toEqual(data.payload.status);
      expect(payload.defaultMessage).toEqual(data.payload.defaultMessage);
      expect(payload.message).toEqual(data.payload.message);
    });
    test('success', async () => {
      const data = {
        status: true,
        payload: send,
      };

      const res = await query(`/${url}/create`, 'post', send, accessToken);

      const { body, statusCode } = res;
      const { payload } = body;

      expect(statusCode).toBe(200);
      expect(body.status).toEqual(data.status);
      expect(payload.id).toBeDefined();
      expect(payload.id.length).toEqual(24);
      expect(payload.name).toEqual(data.payload.name);
      expect(payload.level).toEqual(data.payload.level);
      expect(payload.userId).toEqual(data.payload.userId);
      id = payload.id;
    });
    test('error', async () => {
      const data = {
        status: false,
        payload: {
          status: 422,
          defaultMessage: 'Unprocessable Entity',
          message: 'This Language exists',
        },
      };

      const res = await query(`/${url}/create`, 'post', send, accessToken);

      const { body, statusCode } = res;
      const { payload } = body;

      expect(statusCode).toBe(422);
      expect(body.status).toEqual(data.status);
      expect(payload.status).toEqual(422);
      expect(payload.defaultMessage).toEqual(data.payload.defaultMessage);
      expect(payload.message).toEqual(data.payload.message);
    });
  });
  describe('Find by id', () => {
    test('dto is not corrected id', async () => {
      const data = {
        status: false,
        payload: {
          errors: [
            {
              value: isNotCorrectId,
              property: 'id',
              errorList: {
                isMongoId: 'The id is incorrect',
              },
            },
          ],
        },
      };

      const res = await query(`/${url}/${isNotCorrectId}`, 'get', {}, accessToken);

      const { body, statusCode } = res;
      const { payload } = body;
      const { value, property, errorList } = payload.errors[0];

      expect(statusCode).toBe(422);
      expect(body.status).toEqual(data.status);
      expect(value).toEqual(data.payload.errors[0].value);
      expect(property).toEqual(data.payload.errors[0].property);
      expect(errorList.isMongoId).toEqual(data.payload.errors[0].errorList.isMongoId);
    });
    test('success', async () => {
      const data = {
        status: true,
        payload: {
          id: id,
          ...send,
        },
      };

      const res = await query(`/${url}/${id}`, 'get', {}, accessToken);

      const { body, statusCode } = res;
      expect(statusCode).toBe(200);
      expect(body.status).toEqual(data.status);

      const { payload } = body;
      expect(payload.id).toBeDefined();
      expect(payload.id).toEqual(data.payload.id);

      expect(payload.name).toBeDefined();
      expect(payload.name).toEqual(data.payload.name);

      expect(payload.level).toBeDefined();
      expect(payload.level).toEqual(data.payload.level);

      expect(payload.userId).toBeDefined();
      expect(payload.userId).toEqual(data.payload.userId);
    });
    test('not found', async () => {
      const data = {
        status: false,
        payload: {
          status: 404,
          defaultMessage: 'Not Found',
          message: 'This Language not found',
        },
      };

      const res = await query(`/${url}/6377b287caae55d58a5587d6`, 'get', {}, accessToken);

      const { body, statusCode } = res;
      expect(statusCode).toBe(404);
      expect(body.status).toEqual(data.status);

      const { payload } = body;
      expect(payload.status).toEqual(data.payload.status);
      expect(payload.defaultMessage).toEqual(data.payload.defaultMessage);
      expect(payload.message).toEqual(data.payload.message);
    });
  });
  describe('Update', () => {
    describe('Dto is not corrected data', () => {
      let IsNotCorrectDate = {};

      let statusCode;
      let body;
      let payload;
      let errors;

      beforeAll(async () => {
        const res = await query(`/${url}/update`, 'patch', IsNotCorrectDate, accessToken);
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
      test('id - incorrect', async () => {
        const e = errors[0];
        const data = {
          value: undefined,
          property: 'id',
          errorList: {
            isMongoId: 'The id is incorrect',
            isString: 'The id is incorrect',
            isNotEmpty: 'The id necessarily is required',
          },
        };
        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);
        expect(e.errorList.isNotEmpty).toBeDefined();
        expect(e.errorList.isNotEmpty).toEqual(data.errorList.isNotEmpty);
        expect(e.errorList.isString).toBeDefined();
        expect(e.errorList.isString).toEqual(data.errorList.isString);
        expect(e.errorList.isMongoId).toBeDefined();
        expect(e.errorList.isMongoId).toEqual(data.errorList.isMongoId);
      });
      test('level - incorrect', async () => {
        const e = errors[1];
        const data = {
          value: undefined,
          property: 'level',
          errorList: {
            isEnum:
              'The level is incorrect and should have: native,proficient,advanced,upper-intermediate,intermediate,pre-intermediate,elementary,beginner',
            isNotEmpty: 'The level necessarily is required',
          },
        };
        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);
        expect(e.errorList.isNotEmpty).toBeDefined();
        expect(e.errorList.isNotEmpty).toEqual(data.errorList.isNotEmpty);

        expect(e.errorList.isEnum).toBeDefined();
        expect(e.errorList.isEnum).toEqual(data.errorList.isEnum);
      });
    });

    test('default data - success', async () => {
      const data = {
        status: true,
        payload: {
          ...send,
          ...sendUpdate,
          id: id,
        },
      };

      const res = await query(`/${url}/update`, 'patch', { id: id, ...sendUpdate }, accessToken);

      const { body, statusCode } = res;
      expect(statusCode).toBe(200);
      expect(body.status).toEqual(data.status);

      const { payload } = body;
      expect(payload.id).toBeDefined();
      expect(payload.id).toEqual(data.payload.id);

      expect(payload.name).toBeDefined();
      expect(payload.name).toEqual(data.payload.name);

      expect(payload.level).toBeDefined();
      expect(payload.level).toEqual(data.payload.level);

      expect(payload.userId).toBeDefined();
      expect(payload.userId).toEqual(data.payload.userId);
    });

    test('default data - error', async () => {
      const data = {
        status: false,
        payload: {
          status: 404,
          defaultMessage: 'Not Found',
          message: 'This Language not update',
        },
      };
      const res = await query(
        `/${url}/update`,
        'patch',
        { id: '6377b287caae55d58a5587d6', ...sendUpdate },
        accessToken,
      );
      const { body, statusCode } = res;
      expect(statusCode).toBe(404);
      expect(body.status).toEqual(data.status);

      const { payload } = body;
      expect(payload.status).toEqual(data.payload.status);
      expect(payload.defaultMessage).toEqual(data.payload.defaultMessage);
      expect(payload.message).toEqual(data.payload.message);
    });
  });
  describe('Delete', () => {
    test('dto is not corrected id', async () => {
      const data = {
        status: false,
        payload: {
          errors: [
            {
              value: isNotCorrectId,
              property: 'id',
              errorList: {
                isMongoId: 'The id is incorrect',
              },
            },
          ],
        },
      };

      const res = await query(`/${url}/${isNotCorrectId}`, 'delete', {}, accessToken);

      const { body, statusCode } = res;
      const { payload } = body;
      const { value, property, errorList } = payload.errors[0];

      expect(statusCode).toBe(422);
      expect(body.status).toEqual(data.status);
      expect(value).toEqual(data.payload.errors[0].value);
      expect(property).toEqual(data.payload.errors[0].property);
      expect(errorList.isMongoId).toEqual(data.payload.errors[0].errorList.isMongoId);
    });
    test('success', async () => {
      const data = {
        status: true,
        payload: {
          id: id,
          ...send,
        },
      };

      const res = await query(`/${url}/${id}`, 'delete', {}, accessToken);
      const { body, statusCode } = res;
      const { payload } = body;
      expect(statusCode).toBe(200);
      expect(body.status).toEqual(data.status);
      expect(payload.name).toEqual(data.payload.name);
    });

    test('error', async () => {
      const data = {
        status: false,
        payload: {
          status: 404,
          defaultMessage: 'Not Found',
          message: 'This Language not found',
        },
      };

      const res = await query(`/${url}/${id}`, 'delete', {}, accessToken);

      const { body, statusCode } = res;

      expect(statusCode).toBe(404);
      expect(body.status).toEqual(data.status);

      const { payload } = body;

      expect(payload.status).toEqual(data.payload.status);
      expect(payload.defaultMessage).toEqual(data.payload.defaultMessage);
      expect(payload.message).toEqual(data.payload.message);
    });
  });
});
