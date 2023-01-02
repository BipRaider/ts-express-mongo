import 'reflect-metadata';
import { beforeAll, describe, test, expect } from '@jest/globals';

import { query } from '../server';

describe('Project e2e', () => {
  const url = 'project';
  let id: string = '';
  let accessToken: string;

  const send = {
    duration: '10.01.22 - 11.02.22',
    achievements: 'Test aaaaaaaaaaaaaaaaaaaaaaaaaaa',
    position: 'Backend NodeJs',
    status: 'start',
    technologies: ['node'],
    name: 'TEST-PROJECT',
    link: 'http://localhost:8001',
    description: 'some text',
  };

  const sendUpdate = {
    duration: '11.03.33 - 12.03.33',
    achievements: 'Test ssssssss',
    position: 'Frontend ReactJs',
    status: 'stop',
    link: 'http://localhost:9999',
    description: 'some text some text some text some text some text some text',
  };

  const isNotCorrectId = '136669aea50606b8f5765d1_BAD_Id';

  const sendIsNotCorrect = {
    duration: 111111,
    achievements: 22222222,
    position: 'test',
    status: 'test',
    technologies: {},
    name: 33333333,
    link: 4444444,
    description: 5555555,
  };

  beforeAll(async () => {
    const res = await query('/users/login', 'post', { email: 'the1@1.com', password: '123456789' });
    const { body } = res;
    const { payload } = body;
    accessToken = payload.accessToken;
  });

  describe('Create:', () => {
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
      test('duration - incorrect', async () => {
        const e = errors[0];
        const data = {
          value: sendIsNotCorrect.duration,
          property: 'duration',
          errorList: { isString: 'The duration is incorrect' },
        };
        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);
        expect(e.errorList.isString).toBeDefined();
        expect(e.errorList.isString).toEqual(data.errorList.isString);
      });
      test('achievements - incorrect', async () => {
        const e = errors[1];
        const data = {
          value: sendIsNotCorrect.achievements,
          property: 'achievements',
          errorList: { isString: 'The achievements is incorrect' },
        };
        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);
        expect(e.errorList.isString).toBeDefined();
        expect(e.errorList.isString).toEqual(data.errorList.isString);
      });
      test('position - incorrect', async () => {
        const e = errors[2];
        const data = {
          value: sendIsNotCorrect.position,
          property: 'position',
          errorList: {
            isEnum:
              'The position is incorrect and should have: Frontend ReactJs,Backend NodeJs,DevOps,Full stack JavaScript',
          },
        };
        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);
        expect(e.errorList.isEnum).toBeDefined();
        expect(e.errorList.isEnum).toEqual(data.errorList.isEnum);
      });
      test('status - incorrect', async () => {
        const e = errors[3];
        const data = {
          value: sendIsNotCorrect.status,
          property: 'status',
          errorList: {
            isEnum: 'The status is incorrect and should have: start,stop,finish,pause,support',
          },
        };
        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);
        expect(e.errorList.isEnum).toBeDefined();
        expect(e.errorList.isEnum).toEqual(data.errorList.isEnum);
      });
      test('technologies - incorrect', async () => {
        const e = errors[4];
        const data = {
          value: sendIsNotCorrect.technologies,
          property: 'technologies',
          errorList: { isArray: 'The technologies is incorrect' },
        };
        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);
        expect(e.errorList.isArray).toBeDefined();
        expect(e.errorList.isArray).toEqual(data.errorList.isArray);
      });
      test('name - incorrect', async () => {
        const e = errors[5];
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
        const e = errors[6];
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
        const e = errors[7];
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
      expect(payload.duration).toEqual(data.payload.duration);
      expect(payload.achievements).toEqual(data.payload.achievements);
      expect(payload.position).toEqual(data.payload.position);
      expect(payload.status).toEqual(data.payload.status);
      expect(payload.technologies).toContain(data.payload.technologies[0]);

      id = payload.id;
    });
    test('error', async () => {
      const data = {
        status: false,
        payload: {
          status: 422,
          defaultMessage: 'Unprocessable Entity',
          message: 'This project exists',
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
  describe('Find by id:', () => {
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
          message: 'This project not found',
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
      expect(payload.duration).toEqual(data.payload.duration);
      expect(payload.achievements).toEqual(data.payload.achievements);
      expect(payload.position).toEqual(data.payload.position);
      expect(payload.status).toEqual(data.payload.status);
      expect(payload.technologies).toContain(data.payload.technologies[0]);
    });
  });
  describe('Update:', () => {
    describe('Dto is not corrected data', () => {
      let statusCode;
      let body;
      let payload;
      let errors;
      const isNotCorrectTechnologies = {
        removeTechnologies: {},
        addTechnologies: {},
      };
      beforeAll(async () => {
        const res = await query(
          `/${url}/update`,
          'patch',
          { id: isNotCorrectId, ...sendIsNotCorrect, ...isNotCorrectTechnologies },
          accessToken,
        );
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
      test('duration - incorrect', async () => {
        const e = errors[1];
        const data = {
          value: sendIsNotCorrect.duration,
          property: 'duration',
          errorList: { isString: 'The duration is incorrect' },
        };
        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);
        expect(e.errorList.isString).toBeDefined();
        expect(e.errorList.isString).toEqual(data.errorList.isString);
      });
      test('achievements - incorrect', async () => {
        const e = errors[2];
        const data = {
          value: sendIsNotCorrect.achievements,
          property: 'achievements',
          errorList: { isString: 'The achievements is incorrect' },
        };
        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);
        expect(e.errorList.isString).toBeDefined();
        expect(e.errorList.isString).toEqual(data.errorList.isString);
      });
      test('position - incorrect', async () => {
        const e = errors[3];
        const data = {
          value: sendIsNotCorrect.position,
          property: 'position',
          errorList: {
            isEnum:
              'The position is incorrect and should have: Frontend ReactJs,Backend NodeJs,DevOps,Full stack JavaScript',
          },
        };
        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);
        expect(e.errorList.isEnum).toBeDefined();
        expect(e.errorList.isEnum).toEqual(data.errorList.isEnum);
      });
      test('status - incorrect', async () => {
        const e = errors[4];
        const data = {
          value: sendIsNotCorrect.status,
          property: 'status',
          errorList: {
            isEnum: 'The status is incorrect and should have: start,stop,finish,pause,support',
          },
        };
        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);
        expect(e.errorList.isEnum).toBeDefined();
        expect(e.errorList.isEnum).toEqual(data.errorList.isEnum);
      });
      test('removeTechnologies - incorrect', async () => {
        const e = errors[5];
        const data = {
          value: isNotCorrectTechnologies.removeTechnologies,
          property: 'removeTechnologies',
          errorList: { isArray: 'The removeTechnologies is incorrect' },
        };
        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);
        expect(e.errorList.isArray).toBeDefined();
        expect(e.errorList.isArray).toEqual(data.errorList.isArray);
      });
      test('addTechnologies - incorrect', async () => {
        const e = errors[6];
        const data = {
          value: isNotCorrectTechnologies.addTechnologies,
          property: 'addTechnologies',
          errorList: { isArray: 'The addTechnologies is incorrect' },
        };
        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);
        expect(e.errorList.isArray).toBeDefined();
        expect(e.errorList.isArray).toEqual(data.errorList.isArray);
      });
      test('link - incorrect', async () => {
        const e = errors[7];
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
        const e = errors[8];
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
    });

    describe('Default data', () => {
      let statusCode;
      let body;
      let payload;

      const data = {
        status: true,
        payload: {
          ...sendUpdate,
          technologies: ['node'],
          name: send.name,
        },
      };
      beforeAll(async () => {
        const res = await query(`/${url}/update`, 'patch', { id: id, ...sendUpdate }, accessToken);
        statusCode = res.statusCode;
        body = res.body;
        payload = body.payload;
      }, 2000);

      test('status code `200` and status `true`', async () => {
        expect(statusCode).toBe(200);
        expect(body.status).toEqual(data.status);
      });

      test('id - success', async () => {
        expect(payload.id).toBeDefined();
        expect(payload.id).toEqual(id);
      });
      test('name - success', async () => {
        expect(payload.name).toBeDefined();
        expect(payload.name).toEqual(data.payload.name);
      });

      test('description - success', async () => {
        expect(payload.description).toBeDefined();
        expect(payload.description).toEqual(data.payload.description);
      });
      test('link - success', async () => {
        expect(payload.link).toBeDefined();
        expect(payload.link).toEqual(data.payload.link);
      });

      test('duration - success', async () => {
        expect(payload.duration).toBeDefined();
        expect(payload.duration).toEqual(data.payload.duration);
      });
      test('achievements - success', async () => {
        expect(payload.achievements).toBeDefined();
        expect(payload.achievements).toEqual(data.payload.achievements);
      });
      test('position - success', async () => {
        expect(payload.position).toBeDefined();
        expect(payload.position).toEqual(data.payload.position);
      });
      test('status - success', async () => {
        expect(payload.status).toBeDefined();
        expect(payload.status).toEqual(data.payload.status);
      });
      test('technologies - success', async () => {
        expect(payload.technologies).toBeDefined();
        expect(payload.technologies).toContain(data.payload.technologies[0]);
      });
    });

    describe('Technologies', () => {
      const sendTechnologies = {
        removeTechnologies: ['JavaScript', 'TypeScript', 'Jest'],
        addTechnologies: ['JavaScript', 'TypeScript', 'Jest'],
      };

      test('added - success', async () => {
        const data = {
          status: true,
          payload: {
            id: id,
            technologies: ['node', ...sendTechnologies.addTechnologies],
            name: send.name,
          },
        };
        const res = await query(
          `/${url}/update`,
          'patch',
          { id: id, addTechnologies: sendTechnologies.addTechnologies },
          accessToken,
        );

        const { body, statusCode } = res;
        const { payload } = body;

        expect(statusCode).toBe(200);
        expect(body.status).toEqual(data.status);

        expect(payload.id).toBeDefined();
        expect(payload.id).toEqual(data.payload.id);
        expect(payload.name).toBeDefined();
        expect(payload.name).toEqual(data.payload.name);

        expect(payload.technologies).toBeDefined();
        expect(payload.technologies).toContain(data.payload.technologies[0]);
        expect(payload.technologies).toContain(data.payload.technologies[1]);
        expect(payload.technologies).toContain(data.payload.technologies[2]);
        expect(payload.technologies).toContain(data.payload.technologies[3]);
      });
      test('remove one item - success ', async () => {
        const data = {
          status: true,
          payload: {
            id: id,
            technologies: sendTechnologies.addTechnologies,
            name: send.name,
          },
        };
        const res = await query(`/${url}/update`, 'patch', { id: id, removeTechnologies: ['node'] }, accessToken);

        const { body, statusCode } = res;
        const { payload } = body;

        expect(statusCode).toBe(200);
        expect(body.status).toEqual(data.status);

        expect(payload.id).toBeDefined();
        expect(payload.id).toEqual(data.payload.id);
        expect(payload.name).toBeDefined();
        expect(payload.name).toEqual(data.payload.name);

        expect(payload.technologies).toBeDefined();
        expect(payload.technologies).not.toContain('node');
        expect(payload.technologies).toContain(data.payload.technologies[0]);
        expect(payload.technologies).toContain(data.payload.technologies[1]);
        expect(payload.technologies).toContain(data.payload.technologies[2]);
      });
      test('remove all - success ', async () => {
        const data = {
          status: true,
          payload: {
            id: id,
            technologies: [],
            name: send.name,
          },
        };
        const res = await query(
          `/${url}/update`,
          'patch',
          { id: id, removeTechnologies: sendTechnologies.removeTechnologies },
          accessToken,
        );

        const { body, statusCode } = res;
        const { payload } = body;

        expect(statusCode).toBe(200);
        expect(body.status).toEqual(data.status);

        expect(payload.id).toBeDefined();
        expect(payload.id).toEqual(data.payload.id);
        expect(payload.name).toBeDefined();
        expect(payload.name).toEqual(data.payload.name);

        expect(payload.technologies).toBeDefined();
        expect(payload.technologies).not.toContain(sendTechnologies.removeTechnologies[0]);
        expect(payload.technologies).not.toContain(sendTechnologies.removeTechnologies[1]);
        expect(payload.technologies).not.toContain(sendTechnologies.removeTechnologies[2]);
      });
      test('remove and add one item- success ', async () => {
        const data = {
          status: true,
          payload: {
            id: id,
            technologies: ['1111111', '22222'],
            name: send.name,
          },
        };
        const res = await query(
          `/${url}/update`,
          'patch',
          { id: id, addTechnologies: ['1111111', '22222'], removeTechnologies: sendTechnologies.removeTechnologies },
          accessToken,
        );

        const { body, statusCode } = res;
        const { payload } = body;

        expect(statusCode).toBe(200);
        expect(body.status).toEqual(data.status);

        expect(payload.id).toBeDefined();
        expect(payload.id).toEqual(data.payload.id);
        expect(payload.name).toBeDefined();
        expect(payload.name).toEqual(data.payload.name);

        expect(payload.technologies).toBeDefined();
        expect(payload.technologies).not.toContain(sendTechnologies.removeTechnologies[0]);
        expect(payload.technologies).not.toContain(sendTechnologies.removeTechnologies[1]);
        expect(payload.technologies).not.toContain(sendTechnologies.removeTechnologies[2]);
        expect(payload.technologies).toContain(data.payload.technologies[0]);
        expect(payload.technologies).toContain(data.payload.technologies[1]);
      });
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
      expect(payload.duration).toEqual(data.payload.duration);
      expect(payload.achievements).toEqual(data.payload.achievements);
      expect(payload.position).toEqual(data.payload.position);
      expect(payload.status).toEqual(data.payload.status);
    });

    test('error', async () => {
      const data = {
        status: false,
        payload: {
          status: 404,
          defaultMessage: 'Not Found',
          message: 'This project not found',
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
