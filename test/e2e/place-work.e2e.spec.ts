import 'reflect-metadata';
import { beforeAll, describe, test, expect } from '@jest/globals';

import { query } from '../server';

describe('Place work e2e', () => {
  const url = 'place-work';
  let id: string = '';
  let accessToken: string;

  const send = {
    userId: '6377b287caae55d58a5587d6',
    name: 'TEST PLACE WORK',
    description: 'test test',
    link: 'TEST.com',
    start_duration: '11-11-11',
    end_duration: '22-22-22',
    position: 'backend',
    status: true,
  };

  const sendUpdate = {
    name: 'TEST PLACE WORK test',
    description: 'test test  test test',
    link: 'TEST.test.com',
    start_duration: '33-33-33',
    end_duration: '44-44-44',
    position: 'front',
    status: false,
  };

  const isNotCorrectId = '136669aea50606b8f5765d1_BAD_Id';

  beforeAll(async () => {
    const res = await query('/users/login', 'post', { email: 'the1@1.com', password: '123456789' });
    const { body } = res;
    const { payload } = body;
    accessToken = payload.accessToken;
  });

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
      test('link - incorrect', async () => {
        const e = errors[2];
        const data = {
          value: undefined,
          property: 'position',
          errorList: {
            isString: 'The position is incorrect',
            isNotEmpty: 'The position necessarily is required',
          },
        };

        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);

        expect(e.errorList.isNotEmpty).toBeDefined();
        expect(e.errorList.isNotEmpty).toEqual(data.errorList.isNotEmpty);

        expect(e.errorList.isString).toBeDefined();
        expect(e.errorList.isString).toEqual(data.errorList.isString);
      });

      test('start_duration - incorrect', async () => {
        const e = errors[3];
        const data = {
          value: undefined,
          property: 'start_duration',
          errorList: {
            isString: 'The start_duration is incorrect',
            isNotEmpty: 'The start_duration necessarily is required',
          },
        };

        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);

        expect(e.errorList.isNotEmpty).toBeDefined();
        expect(e.errorList.isNotEmpty).toEqual(data.errorList.isNotEmpty);

        expect(e.errorList.isString).toBeDefined();
        expect(e.errorList.isString).toEqual(data.errorList.isString);
      });

      test('end_duration - incorrect', async () => {
        const e = errors[4];
        const data = {
          value: undefined,
          property: 'end_duration',
          errorList: {
            isString: 'The end_duration is incorrect',
            isNotEmpty: 'The end_duration necessarily is required',
          },
        };

        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);

        expect(e.errorList.isNotEmpty).toBeDefined();
        expect(e.errorList.isNotEmpty).toEqual(data.errorList.isNotEmpty);

        expect(e.errorList.isString).toBeDefined();
        expect(e.errorList.isString).toEqual(data.errorList.isString);
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
      expect(statusCode).toBe(200);
      expect(body.status).toEqual(data.status);

      const { payload } = body;
      expect(payload.id).toBeDefined();
      expect(payload.id.length).toEqual(24);

      expect(payload.name).toEqual(data.payload.name);
      expect(payload.link).toEqual(data.payload.link);
      expect(payload.userId).toEqual(data.payload.userId);
      expect(payload.description).toEqual(data.payload.description);
      expect(payload.end_duration).toEqual(data.payload.end_duration);
      expect(payload.start_duration).toEqual(data.payload.start_duration);
      expect(payload.position).toEqual(data.payload.position);
      expect(payload.status).toEqual(data.payload.status);

      id = payload.id;
    });
    test('error', async () => {
      const data = {
        status: false,
        payload: {
          status: 422,
          defaultMessage: 'Unprocessable Entity',
          message: 'This Place work exists',
        },
      };

      const res = await query(`/${url}/create`, 'post', send, accessToken);

      const { body, statusCode } = res;
      expect(statusCode).toBe(422);
      expect(body.status).toEqual(data.status);

      const { payload } = body;
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
      expect(statusCode).toBe(422);
      expect(body.status).toEqual(data.status);

      const { payload } = body;
      const { value, property, errorList } = payload.errors[0];

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

      expect(payload.link).toBeDefined();
      expect(payload.link).toEqual(data.payload.link);

      expect(payload.userId).toBeDefined();
      expect(payload.userId).toEqual(data.payload.userId);

      expect(payload.userId).toBeDefined();
      expect(payload.description).toEqual(data.payload.description);

      expect(payload.end_duration).toBeDefined();
      expect(payload.end_duration).toEqual(data.payload.end_duration);

      expect(payload.start_duration).toBeDefined();
      expect(payload.start_duration).toEqual(data.payload.start_duration);

      expect(payload.position).toBeDefined();
      expect(payload.position).toEqual(data.payload.position);

      expect(payload.status).toBeDefined();
      expect(payload.status).toEqual(data.payload.status);
    });
    test('not found', async () => {
      const data = {
        status: false,
        payload: {
          status: 404,
          defaultMessage: 'Not Found',
          message: 'This Place work not found',
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
      let IsNotCorrectDate = {
        name: 1111,
        description: 2222,
        link: 3333,
        start_duration: 4444,
        end_duration: 6666,
        position: 5555,
        status: 6666,
      };

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
          property: 'id',
          errorList: {
            isMongoId: 'The id is incorrect',
            isString: 'The id is incorrect',
            isNotEmpty: 'The id necessarily is required',
          },
        };

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
          value: IsNotCorrectDate.name,
          property: 'name',
          errorList: {
            isString: 'The name is incorrect',
          },
        };
        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);

        expect(e.errorList.isString).toBeDefined();
        expect(e.errorList.isString).toEqual(data.errorList.isString);
      });
      test('description - incorrect', async () => {
        const e = errors[2];
        const data = {
          value: IsNotCorrectDate.description,
          property: 'description',
          errorList: {
            isString: 'The description is incorrect',
          },
        };

        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);

        expect(e.errorList.isString).toBeDefined();
        expect(e.errorList.isString).toEqual(data.errorList.isString);
      });

      test('link - incorrect', async () => {
        const e = errors[3];
        const data = {
          value: IsNotCorrectDate.link,
          property: 'link',
          errorList: { isString: 'The link is incorrect' },
        };

        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);

        expect(e.errorList.isString).toBeDefined();
        expect(e.errorList.isString).toEqual(data.errorList.isString);
      });

      test('position - incorrect', async () => {
        const e = errors[4];
        const data = {
          value: IsNotCorrectDate.position,
          property: 'position',
          errorList: { isString: 'The position is incorrect' },
        };

        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);

        expect(e.errorList.isString).toBeDefined();
        expect(e.errorList.isString).toEqual(data.errorList.isString);
      });

      test('start_duration - incorrect', async () => {
        const e = errors[5];
        const data = {
          value: IsNotCorrectDate.start_duration,
          property: 'start_duration',
          errorList: { isString: 'The start_duration is incorrect' },
        };

        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);

        expect(e.errorList.isString).toBeDefined();
        expect(e.errorList.isString).toEqual(data.errorList.isString);
      });

      test('end_duration - incorrect', async () => {
        const e = errors[6];
        const data = {
          value: IsNotCorrectDate.end_duration,
          property: 'end_duration',
          errorList: { isString: 'The end_duration is incorrect' },
        };

        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);

        expect(e.errorList.isString).toBeDefined();
        expect(e.errorList.isString).toEqual(data.errorList.isString);
      });
      test('status - incorrect', async () => {
        const e = errors[7];
        const data = {
          value: IsNotCorrectDate.status,
          property: 'status',
          errorList: { isBoolean: 'The status is incorrect' },
        };

        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);

        expect(e.errorList.isBoolean).toBeDefined();
        expect(e.errorList.isBoolean).toEqual(data.errorList.isBoolean);
      });
    });

    describe('Default data - success', () => {
      const data = {
        status: true,
        payload: {
          ...send,
          ...sendUpdate,
          id: id,
        },
      };

      let statusCode;
      let body;
      let payload;

      beforeAll(async () => {
        const res = await query(`/${url}/update`, 'patch', { id: id, ...sendUpdate }, accessToken);
        statusCode = res.statusCode;
        body = res.body;
        payload = body.payload;
        data.payload.id = id;
      });

      test('status and statusCode', async () => {
        expect(statusCode).toBe(200);
        expect(body.status).toEqual(data.status);
      });

      test('id', async () => {
        expect(payload.id).toBeDefined();
        expect(payload.id).toEqual(data.payload.id);
      });
      test('name', async () => {
        expect(payload.name).toBeDefined();
        expect(payload.name).toEqual(data.payload.name);
      });
      test('link', async () => {
        expect(payload.link).toBeDefined();
        expect(payload.link).toEqual(data.payload.link);
      });
      test('usrId', async () => {
        expect(payload.userId).toBeDefined();
        expect(payload.userId).toEqual(data.payload.userId);
      });
      test('description', async () => {
        expect(payload.description).toBeDefined();
        expect(payload.description).toEqual(data.payload.description);
      });
      test('end_duration', async () => {
        expect(payload.end_duration).toBeDefined();
        expect(payload.end_duration).toEqual(data.payload.end_duration);
      });
      test('start_duration', async () => {
        expect(payload.start_duration).toBeDefined();
        expect(payload.start_duration).toEqual(data.payload.start_duration);
      });

      test('position', async () => {
        expect(payload.position).toBeDefined();
        expect(payload.position).toEqual(data.payload.position);
      });

      test('status', async () => {
        expect(payload.status).toBeDefined();
        expect(payload.status).toEqual(data.payload.status);
      });
    });

    test('default data - error', async () => {
      const data = {
        status: false,
        payload: {
          status: 404,
          defaultMessage: 'Not Found',
          message: 'This Place work not update',
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
          ...sendUpdate,
        },
      };

      const res = await query(`/${url}/${id}`, 'delete', {}, accessToken);
      const { body, statusCode } = res;
      const { payload } = body;
      expect(statusCode).toBe(200);
      expect(payload.name).toBeDefined();
      expect(payload.name).toEqual(data.payload.name);

      expect(payload.link).toBeDefined();
      expect(payload.link).toEqual(data.payload.link);

      expect(payload.userId).toBeDefined();
      expect(payload.userId).toEqual(data.payload.userId);

      expect(payload.userId).toBeDefined();
      expect(payload.description).toEqual(data.payload.description);

      expect(payload.end_duration).toBeDefined();
      expect(payload.end_duration).toEqual(data.payload.end_duration);

      expect(payload.start_duration).toBeDefined();
      expect(payload.start_duration).toEqual(data.payload.start_duration);

      expect(payload.position).toBeDefined();
      expect(payload.position).toEqual(data.payload.position);

      expect(payload.status).toBeDefined();
      expect(payload.status).toEqual(data.payload.status);
    });

    test('error', async () => {
      const data = {
        status: false,
        payload: {
          status: 404,
          defaultMessage: 'Not Found',
          message: 'This Place work not found',
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
