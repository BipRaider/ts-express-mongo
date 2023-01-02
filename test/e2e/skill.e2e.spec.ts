import 'reflect-metadata';
import { beforeAll, describe, test, expect } from '@jest/globals';

import { query } from '../server';

describe('Skill e2e', () => {
  const url = 'skill';
  let skill_id: string = '';
  let accessToken: string;

  beforeAll(async () => {
    const res = await query('/users/login', 'post', { email: 'the1@1.com', password: '123456789' });
    const { body } = res;
    const { payload } = body;
    accessToken = payload.accessToken;
  }, 2000);

  const send = {
    experience: '12.12.1212',
    skill: 66,
    link: 'http://localhost:8001',
    description: 'aaaaaaaaaaaaaaaaaaaaaaaaaaa',
    name: 'test-SKILL',
    libraries: [],
    type: 'service',
    dev: 'all',
  };

  const isNotCorrectId = '136669aea50606b8f5765d1_BAD_Id';
  const sendIsNotCorrect = {
    experience: 1, // should be string
    skill: '77', //should be number
    link: {}, // should be string
    description: {}, // should be string
    name: 11111111, // should be string
    libraries: {},
    type: 233333, //// should be service
    dev: 333333, // should be all
  };

  describe('Create', () => {
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
      test('experience - incorrect', async () => {
        const e = errors[0];
        const data = {
          value: 1,
          property: 'experience',
          errorList: { isString: 'The experience is incorrect' },
        };
        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);
        expect(e.errorList.isString).toEqual(data.errorList.isString);
      });
      test('skill - incorrect', async () => {
        const i = 1;
        const e = errors[i];
        const data = {
          value: '77',
          property: 'skill',
          errorList: {
            max: 'skill must not be greater than 100',
            min: 'skill must not be less than 0',
            isInt: 'skill must be an integer number',
          },
        };

        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);
        expect(e.errorList.max).toEqual(data.errorList.max);
        expect(e.errorList.min).toEqual(data.errorList.min);
        expect(e.errorList.isInt).toEqual(data.errorList.isInt);
      });
      test('link - incorrect', async () => {
        const i = 2;
        const e = errors[i];
        const data = {
          value: {},
          property: 'link',
          errorList: { isString: 'The link is incorrect' },
        };
        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);
        expect(e.errorList.isString).toEqual(data.errorList.isString);
      });
      test('description - incorrect', async () => {
        const i = 3;
        const e = errors[i];
        const data = {
          value: {},
          property: 'description',
          errorList: { isString: 'The description is incorrect' },
        };
        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);
        expect(e.errorList.isString).toEqual(data.errorList.isString);
      });
      test('name - incorrect', async () => {
        const i = 4;
        const e = errors[i];
        const data = {
          value: 11111111,
          property: 'name',
          errorList: { isString: 'The name is incorrect' },
        };
        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);
        expect(e.errorList.isString).toEqual(data.errorList.isString);
      });

      test('libraries - incorrect', async () => {
        const i = 5;
        const e = errors[i];
        const data = {
          value: {},
          property: 'libraries',
          errorList: {
            isMongoId: 'Some id is incorrect',
            isArray: 'The libraries is incorrect',
          },
        };
        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);
        expect(e.errorList.isArray).toEqual(data.errorList.isArray);
        expect(e.errorList.isMongoId).toEqual(data.errorList.isMongoId);
      });
      test('type - incorrect', async () => {
        const i = 6;
        const e = errors[i];
        const data = {
          value: 233333,
          property: 'type',
          errorList: {
            isEnum: 'The dev is incorrect and should have: framework,language,library,technology,service,software',
          },
        };
        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);
        expect(e.errorList.isEnum).toEqual(data.errorList.isEnum);
      });

      test('dev - incorrect', async () => {
        const e = errors[7];
        const data = {
          value: 333333,
          property: 'dev',
          errorList: {
            isEnum: 'The dev is incorrect and should have: frontend,backend,devops,database,all',
          },
        };
        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);
        expect(e.errorList.isEnum).toEqual(data.errorList.isEnum);
      });
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
      expect(payload.type).toEqual(data.payload.type);
      expect(payload.description).toEqual(data.payload.description);
      expect(payload.link).toEqual(data.payload.link);
      expect(payload.dev).toEqual(data.payload.dev);
      expect(payload.skill).toEqual(data.payload.skill);
      expect(payload.dev).toEqual(data.payload.dev);

      skill_id = payload.id;
    });
    test('error', async () => {
      const data = {
        status: false,
        payload: {
          status: 422,
          defaultMessage: 'Unprocessable Entity',
          message: 'This skill exists',
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
    test('error id is not found', async () => {
      const data = {
        status: false,
        payload: {
          status: 404,
          defaultMessage: 'Not Found',
          message: 'This skill not found',
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
          id: skill_id,
          ...send,
        },
      };

      const res = await query(`/${url}/${skill_id}`, 'get', {}, accessToken);

      const { body, statusCode } = res;
      const { payload } = body;

      expect(statusCode).toBe(200);
      expect(body.status).toEqual(data.status);
      expect(payload.id).toBeDefined();
      expect(payload.id).toEqual(data.payload.id);
      expect(payload.name).toEqual(data.payload.name);
      expect(payload.type).toEqual(data.payload.type);
      expect(payload.description).toEqual(data.payload.description);
      expect(payload.link).toEqual(data.payload.link);
      expect(payload.dev).toEqual(data.payload.dev);
      expect(payload.skill).toEqual(data.payload.skill);
      expect(payload.dev).toEqual(data.payload.dev);
    });
  });
  describe('Update', () => {
    const sendUpdateList = {
      addLib: ['63655afe7d606206511b6743', '63655afe7d606206511b6746'],
      removeLib: ['63655afe7d606206511b6743', '63655afe7d606206511b6746'],
    };
    const sendUpdate = {
      experience: '22.22.2222',
      skill: 77,
      link: 'http://localhost:8004',
      description: 'bbbbbbbb',
      type: 'framework',
      dev: 'backend',
    };

    describe('Dto is not corrected data', () => {
      let statusCode;
      let body;
      let payload;
      let errors;
      const libIsNotCorrect = {
        addLib: {},
        removeLib: {},
      };
      beforeAll(async () => {
        const res = await query(
          `/${url}/update`,
          'patch',
          { id: isNotCorrectId, ...sendIsNotCorrect, ...libIsNotCorrect },
          accessToken,
        );
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

      test('id - incorrect', async () => {
        const i = 0;
        const e = errors[i];
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

      test('skill - incorrect', async () => {
        const i = 1;
        const e = errors[i];
        const data = {
          value: '77',
          property: 'skill',
          errorList: {
            max: 'skill must not be greater than 100',
            min: 'skill must not be less than 0',
            isInt: 'skill must be an integer number',
          },
        };

        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);
        expect(e.errorList.max).toEqual(data.errorList.max);
        expect(e.errorList.min).toEqual(data.errorList.min);
        expect(e.errorList.isInt).toEqual(data.errorList.isInt);
      });
      test('link - incorrect', async () => {
        const i = 2;
        const e = errors[i];
        const data = {
          value: {},
          property: 'link',
          errorList: { isString: 'The link is incorrect' },
        };
        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);
        expect(e.errorList.isString).toEqual(data.errorList.isString);
      });
      test('description - incorrect', async () => {
        const i = 3;
        const e = errors[i];
        const data = {
          value: {},
          property: 'description',
          errorList: { isString: 'The description is incorrect' },
        };
        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);
        expect(e.errorList.isString).toEqual(data.errorList.isString);
      });
      test('type - incorrect', async () => {
        const i = 6;
        const e = errors[i];

        const data = {
          value: 233333,
          property: 'type',
          errorList: {
            isEnum: 'The dev is incorrect and should have: framework,language,library,technology,service,software',
          },
        };
        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);
        expect(e.errorList.isEnum).toEqual(data.errorList.isEnum);
      });

      test('dev - incorrect', async () => {
        const e = errors[7];
        const data = {
          value: 333333,
          property: 'dev',
          errorList: {
            isEnum: 'The dev is incorrect and should have: frontend,backend,devops,database,all',
          },
        };
        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);
        expect(e.errorList.isEnum).toEqual(data.errorList.isEnum);
      });

      test('experience - incorrect', async () => {
        const e = errors[8];
        const data = {
          value: 1,
          property: 'experience',
          errorList: { isString: 'The experience is incorrect' },
        };
        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);
        expect(e.errorList.isString).toEqual(data.errorList.isString);
      });

      test('addLib - incorrect', async () => {
        const i = 5;
        const e = errors[i];

        const data = {
          value: libIsNotCorrect.addLib,
          property: 'addLib',
          errorList: {
            isMongoId: 'Some id is incorrect',
            isArray: 'The addLib is incorrect',
          },
        };
        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);
        expect(e.errorList.isArray).toEqual(data.errorList.isArray);
        expect(e.errorList.isMongoId).toEqual(data.errorList.isMongoId);
      });

      test('removeLib - incorrect', async () => {
        const i = 4;
        const e = errors[i];

        const data = {
          value: libIsNotCorrect.removeLib,
          property: 'removeLib',
          errorList: {
            isMongoId: 'Some id is incorrect',
            isArray: 'The removeLib is incorrect',
          },
        };
        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);
        expect(e.errorList.isArray).toEqual(data.errorList.isArray);
        expect(e.errorList.isMongoId).toEqual(data.errorList.isMongoId);
      });
    });

    test('default data - success', async () => {
      const data = {
        status: true,
        payload: {
          ...sendUpdate,
          name: send.name,
        },
      };

      const res = await query(`/${url}/update`, 'patch', { id: skill_id, ...sendUpdate }, accessToken);
      const { body, statusCode } = res;
      const { payload } = body;

      expect(statusCode).toBe(200);
      expect(body.status).toEqual(data.status);
      expect(payload.id).toBeDefined();
      expect(payload.id).toEqual(skill_id);
      expect(payload.name).toEqual(data.payload.name);
      expect(payload.type).toEqual(data.payload.type);
      expect(payload.description).toEqual(data.payload.description);
      expect(payload.link).toEqual(data.payload.link);
      expect(payload.dev).toEqual(data.payload.dev);
      expect(payload.skill).toEqual(data.payload.skill);
      expect(payload.dev).toEqual(data.payload.dev);
    });

    test('Add 2 libs - success', async () => {
      const data = {
        status: true,
        payload: {
          libraries: [
            {
              id: '63655afe7d606206511b6743',
              name: '@apollo/client',
            },
            {
              id: '63655afe7d606206511b6746',
              name: 'multer',
            },
          ],
        },
      };

      const res = await query(`/${url}/update`, 'patch', { id: skill_id, addLib: sendUpdateList.addLib }, accessToken);
      const { body, statusCode } = res;
      const { payload } = body;
      const lib = payload.libraries[0];
      const lib1 = payload.libraries[1];
      expect(statusCode).toBe(200);
      expect(body.status).toEqual(data.status);
      expect(lib.id).toEqual(data.payload.libraries[0].id);
      expect(lib.name).toEqual(data.payload.libraries[0].name);
      expect(lib1.id).toEqual(data.payload.libraries[1].id);
      expect(lib1.name).toEqual(data.payload.libraries[1].name);
    });

    test('Delete 1 lib- success', async () => {
      const data = {
        status: true,
        payload: {
          id: skill_id,
          ...sendUpdate,
          name: send.name,
          libraries: [
            {
              id: '63655afe7d606206511b6743',
              name: '@apollo/client',
            },
          ],
        },
      };
      const res = await query(
        `/${url}/update`,
        'patch',
        { id: skill_id, removeLib: [sendUpdateList.removeLib[1]] },
        accessToken,
      );

      const { body, statusCode } = res;
      const { payload } = body;
      const lib = payload.libraries[0];
      const lib1 = payload.libraries[1];

      expect(statusCode).toBe(200);
      expect(body.status).toEqual(data.status);
      expect(lib.id).toEqual(data.payload.libraries[0].id);
      expect(lib.name).toEqual(data.payload.libraries[0].name);
      expect(lib1).not.toBeDefined();
      expect(payload.id).toEqual(data.payload.id);
      expect(payload.name).toEqual(data.payload.name);
      expect(payload.type).toEqual(data.payload.type);
      expect(payload.description).toEqual(data.payload.description);
      expect(payload.link).toEqual(data.payload.link);
      expect(payload.dev).toEqual(data.payload.dev);
      expect(payload.skill).toEqual(data.payload.skill);
      expect(payload.dev).toEqual(data.payload.dev);
    });
    test('Delete 2 lib- success', async () => {
      const data = {
        status: true,
        payload: {
          id: skill_id,
          ...sendUpdate,
          name: send.name,
        },
      };

      const res = await query(
        `/${url}/update`,
        'patch',
        { id: skill_id, removeLib: sendUpdateList.removeLib },
        accessToken,
      );
      const { body, statusCode } = res;
      const { payload } = body;
      const libLength = payload.libraries.length;

      expect(statusCode).toBe(200);
      expect(body.status).toEqual(data.status);
      expect(libLength).toEqual(0);
      expect(payload.id).toEqual(data.payload.id);
      expect(payload.name).toEqual(data.payload.name);
      expect(payload.type).toEqual(data.payload.type);
      expect(payload.description).toEqual(data.payload.description);
      expect(payload.link).toEqual(data.payload.link);
      expect(payload.dev).toEqual(data.payload.dev);
      expect(payload.skill).toEqual(data.payload.skill);
      expect(payload.dev).toEqual(data.payload.dev);
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
          id: skill_id,
        },
      };

      const res = await query(`/${url}/${skill_id}`, 'delete', {}, accessToken);
      const { body, statusCode } = res;
      const { payload } = body;

      expect(statusCode).toBe(200);
      expect(body.status).toEqual(data.status);
      expect(payload.id).toBeDefined();
      expect(payload.id).toEqual(data.payload.id);
    });

    test('error', async () => {
      const data = {
        status: false,
        payload: {
          status: 404,
          defaultMessage: 'Not Found',
          message: 'This skill not found',
        },
      };

      const res = await query(`/${url}/${skill_id}`, 'delete', {}, accessToken);
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
