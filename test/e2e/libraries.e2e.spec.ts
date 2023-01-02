import 'reflect-metadata';
import { beforeAll, describe, test, expect } from '@jest/globals';

import { query } from '../server';

describe('Library e2e', () => {
  const url = 'library';
  let id: string = '';
  let accessToken: string;

  const send = {
    link: 'http://localhost:8001',
    description: 'aaaaaaaaaaaaaaaaaaaaaaaaaaa',
    name: 'TEST-LIB',
    npm: 'service',
    dev: '1',
  };

  const sendUpdate = {
    link: 'http://localhost:5555',
    description: 'nnnnnnnnnnnnnnnn',
    npm: 'npm i -g jest',
    dev: '2',
  };
  const isNotCorrectId = '136669aea50606b8f5765d1_BAD_Id';
  const sendIsNotCorrect = {
    npm: 4444444, // should be string
    dev: 6666, //should be string 1 2 3
    link: 333333, // should be string
    description: 222222, // should be string
    name: 11111111, // should be string
  };
  beforeAll(async () => {
    const res = await query('/users/login', 'post', { email: 'the1@1.com', password: '123456789' });
    const { body } = res;
    const { payload } = body;
    accessToken = payload.accessToken;
  });

  describe('Create', () => {
    describe('dto is not corrected data', () => {
      let statusCode;
      let body;
      let payload;
      let errors;

      beforeAll(async () => {
        const res = await query(`/${url}/create`, 'post', sendIsNotCorrect, accessToken);
        statusCode = res.statusCode;
        body = res.body;
        payload = body.payload;
        errors = body.payload.errors;
      }, 2000);

      test('status code and status', async () => {
        expect(statusCode).toBe(422);
        expect(body.status).toEqual(false);
      });
      test('errors defined', async () => {
        expect(payload.errors).toBeDefined();
      });
      test('name - incorrect', async () => {
        const e = errors[0];
        const data = {
          value: sendIsNotCorrect.name,
          property: 'name',
          errorList: { isString: 'The name is incorrect' },
        };
        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);
        expect(e.errorList.isString).toBeDefined();
        expect(e.errorList.isString).toEqual(data.errorList.isString);
      });
      test('link - incorrect', async () => {
        const e = errors[1];
        const data = {
          value: sendIsNotCorrect.link,
          property: 'link',
          errorList: { isString: 'The link is incorrect' },
        };
        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);
        expect(e.errorList.isString).toBeDefined();
        expect(e.errorList.isString).toEqual(data.errorList.isString);
      });
      test('description - incorrect', async () => {
        const e = errors[2];
        const data = {
          value: sendIsNotCorrect.description,
          property: 'description',
          errorList: { isString: 'The description is incorrect' },
        };
        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);
        expect(e.errorList.isString).toBeDefined();
        expect(e.errorList.isString).toEqual(data.errorList.isString);
      });
      test('npm - incorrect', async () => {
        const e = errors[3];
        const data = {
          value: sendIsNotCorrect.npm,
          property: 'npm',
          errorList: { isString: 'The npm is incorrect' },
        };
        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);
        expect(e.errorList.isString).toBeDefined();
        expect(e.errorList.isString).toEqual(data.errorList.isString);
      });
      test('dev - incorrect', async () => {
        const e = errors[4];
        const data = {
          value: sendIsNotCorrect.dev,
          property: 'dev',
          errorList: {
            isEnum: 'The dev is incorrect and should have: 1,2,3',
          },
        };
        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);
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
      expect(payload.description).toEqual(data.payload.description);
      expect(payload.link).toEqual(data.payload.link);
      expect(payload.dev).toEqual(data.payload.dev);
      expect(payload.npm).toEqual(data.payload.npm);

      id = payload.id;
    });
    test('error', async () => {
      const data = {
        status: false,
        payload: {
          status: 422,
          defaultMessage: 'Unprocessable Entity',
          message: 'This library exists',
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

      const res = await query(`/${url}/${isNotCorrectId}`, 'get', {});

      const { body, statusCode } = res;
      const { payload } = body;
      const { value, property, errorList } = payload.errors[0];

      expect(statusCode).toBe(422);
      expect(body.status).toEqual(data.status);
      expect(value).toEqual(data.payload.errors[0].value);
      expect(property).toEqual(data.payload.errors[0].property);
      expect(errorList.isMongoId).toEqual(data.payload.errors[0].errorList.isMongoId);
    });
    test('error id is not found', async () => {
      const data = {
        status: false,
        payload: {
          status: 404,
          defaultMessage: 'Not Found',
          message: 'This library not found',
        },
      };

      const res = await query(`/${url}/636669aea50606b8f5765d18`, 'get', {}, accessToken);

      const { body, statusCode } = res;
      const { payload } = body;

      expect(statusCode).toBe(404);
      expect(body.status).toEqual(data.status);
      expect(payload.status).toEqual(data.payload.status);
      expect(payload.defaultMessage).toEqual(data.payload.defaultMessage);
      expect(payload.message).toEqual(data.payload.message);
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
      const { payload } = body;

      expect(statusCode).toBe(200);
      expect(body.status).toEqual(data.status);
      expect(payload.id).toBeDefined();
      expect(payload.id).toEqual(data.payload.id);
      expect(payload.id).toEqual(data.payload.id);
      expect(payload.name).toEqual(data.payload.name);
      expect(payload.description).toEqual(data.payload.description);
      expect(payload.link).toEqual(data.payload.link);
      expect(payload.dev).toEqual(data.payload.dev);
      expect(payload.npm).toEqual(data.payload.npm);
    });
  });
  describe('Update', () => {
    describe('Dto is not corrected data', () => {
      let statusCode;
      let body;
      let payload;
      let errors;

      beforeAll(async () => {
        const res = await query(`/${url}/update`, 'patch', { id: isNotCorrectId, ...sendIsNotCorrect }, accessToken);
        statusCode = res.statusCode;
        body = res.body;
        payload = body.payload;
        errors = body.payload.errors;
      }, 2000);

      test('status code `422` and status `false`', async () => {
        expect(statusCode).toBe(422);
        expect(body.status).toEqual(false);
      });
      test('errors defined', async () => {
        expect(payload.errors).toBeDefined();
      });
      test('id - incorrect', async () => {
        const e = errors[0];
        const data = {
          value: isNotCorrectId,
          property: 'id',
          errorList: {
            isMongoId: 'The id is incorrect',
          },
        };

        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);
        expect(e.errorList.isMongoId).toEqual(data.errorList.isMongoId);
      });
      test('link - incorrect', async () => {
        const e = errors[1];
        const data = {
          value: sendIsNotCorrect.link,
          property: 'link',
          errorList: { isString: 'The link is incorrect' },
        };
        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);
        expect(e.errorList.isString).toBeDefined();
        expect(e.errorList.isString).toEqual(data.errorList.isString);
      });
      test('description - incorrect', async () => {
        const e = errors[2];
        const data = {
          value: sendIsNotCorrect.description,
          property: 'description',
          errorList: { isString: 'The description is incorrect' },
        };
        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);
        expect(e.errorList.isString).toBeDefined();
        expect(e.errorList.isString).toEqual(data.errorList.isString);
      });
      test('npm - incorrect', async () => {
        const e = errors[3];
        const data = {
          value: sendIsNotCorrect.npm,
          property: 'npm',
          errorList: { isString: 'The npm is incorrect' },
        };
        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);
        expect(e.errorList.isString).toBeDefined();
        expect(e.errorList.isString).toEqual(data.errorList.isString);
      });
      // test('dev - incorrect', async () => {
      //   const e = errors[4];
      //   const data = {
      //     value: sendIsNotCorrect.dev,
      //     property: 'dev',
      //     errorList: {
      //       isEnum: 'The dev is incorrect and should have: All,Frontend,Backend,2,3,1',
      //       isInt: 'The dev is incorrect',
      //     },
      //   };
      //   expect(e.value).toEqual(data.value);
      //   expect(e.property).toEqual(data.property);
      //   expect(e.errorList.isEnum).toBeDefined();
      //   expect(e.errorList.isEnum).toEqual(data.errorList.isEnum);
      //   expect(e.errorList.isInt).toBeDefined();
      //   expect(e.errorList.isInt).toEqual(data.errorList.isInt);
      // });
    });

    test('default data - success', async () => {
      const data = {
        status: true,
        payload: {
          ...sendUpdate,
          name: send.name,
        },
      };

      const res = await query(`/${url}/update`, 'patch', { id: id, ...sendUpdate }, accessToken);
      const { body, statusCode } = res;
      const { payload } = body;

      expect(statusCode).toBe(200);
      expect(body.status).toEqual(data.status);
      expect(payload.id).toBeDefined();
      expect(payload.id).toEqual(id);
      expect(payload.name).toEqual(data.payload.name);
      expect(payload.description).toEqual(data.payload.description);
      expect(payload.link).toEqual(data.payload.link);
      expect(payload.dev).toEqual(data.payload.dev);
      expect(payload.npm).toEqual(data.payload.npm);
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
          ...sendUpdate,
        },
      };

      const res = await query(`/${url}/${id}`, 'delete', {}, accessToken);
      const { body, statusCode } = res;
      const { payload } = body;
      expect(statusCode).toBe(200);
      expect(body.status).toEqual(data.status);
      expect(payload.name).toEqual(data.payload.name);
      expect(payload.description).toEqual(data.payload.description);
      expect(payload.link).toEqual(data.payload.link);
      expect(payload.dev).toEqual(data.payload.dev);
      expect(payload.npm).toEqual(data.payload.npm);
    });

    test('error', async () => {
      const data = {
        status: false,
        payload: {
          status: 404,
          defaultMessage: 'Not Found',
          message: 'This library not found',
        },
      };

      const res = await query(`/${url}/${id}`, 'delete', {}, accessToken);
      const { body, statusCode } = res;
      const { payload } = body;

      expect(statusCode).toBe(404);
      expect(body.status).toEqual(data.status);
      expect(payload.status).toEqual(data.payload.status);
      expect(payload.defaultMessage).toEqual(data.payload.defaultMessage);
      expect(payload.message).toEqual(data.payload.message);
    });
  });
});
