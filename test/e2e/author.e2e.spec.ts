import 'reflect-metadata';
import { beforeAll, describe, test, expect } from '@jest/globals';

import { query } from '../server';

describe('Author e2e', () => {
  const url = 'about';
  let id: string = '';
  let accessToken: string;

  const send = {
    certificates: ['certificates'],
    duration: '12.12.22',
    name: 'My test',
    description: 'lalalqealalala',
    status: 'working',
    position: 'Backend',
    privateData: {
      firstname: 'bip',
      lastname: 'raider',
      photo: 'photo',
      phone: 'phone',
      email: 'email@gmail.com',
      address: 'adress',
    },
  };
  const sendUpdate = {
    name: 'My new test author',
  };

  const isNotCorrectId = '136669aea50606b8f5765d1_BAD_Id';
  const IsNotCorrectDate = {
    certificates: [11111],
    duration: 222222,
    name: 33333,
    description: 4444,
    status: 5555,
    position: 6666,
    privateData: {
      firstname: 8888,
      lastname: 7777,
      photo: 99999,
      phone: 121212,
      email: 131313,
      address: 141414,
    },
    addLink: {},
    addLanguages: {},
    addPlaceWork: {},
    removeLink: {},
    removeLanguages: {},
    removePlaceWork: {},
  };
  beforeAll(async () => {
    const res = await query('/users/login', 'post', { email: 'the1@1.com', password: '123456789' });
    const { body } = res;
    const { payload } = body;
    accessToken = payload.accessToken;
  }, 1000);

  describe('Create', () => {
    describe('Dto is not corrected data', () => {
      let IsNotCorrectDate = {
        privateData: {
          firstname: 1111,
          lastname: 2222,
          photo: 3333,
          phone: 4444,
          email: 5555,
          address: 6666,
        },
      };

      let statusCode;
      let body;
      let payload;
      let errors;
      let children;

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
      test('author status - incorrect', async () => {
        const e = errors[0];
        const data = {
          property: 'status',
          errorList: {
            isEnum: 'The status is incorrect and should have: working,no-working,looking,considering',
            isNotEmpty: 'The status necessarily is required',
          },
        };
        expect(e.property).toEqual(data.property);
        expect(e.errorList.isNotEmpty).toBeDefined();
        expect(e.errorList.isNotEmpty).toEqual(data.errorList.isNotEmpty);
        expect(e.errorList.isEnum).toBeDefined();
        expect(e.errorList.isEnum).toEqual(data.errorList.isEnum);
      });

      test('position - incorrect', async () => {
        const e = errors[1];
        const data = {
          property: 'position',
          errorList: {
            isEnum: 'The position is incorrect and should have: Frontend,Backend,DevOps,Full-stack,Mobile',
            isNotEmpty: 'The id position is required',
          },
        };
        expect(e.property).toEqual(data.property);
        expect(e.errorList.isNotEmpty).toBeDefined();
        expect(e.errorList.isNotEmpty).toEqual(data.errorList.isNotEmpty);
        expect(e.errorList.isEnum).toBeDefined();
        expect(e.errorList.isEnum).toEqual(data.errorList.isEnum);
      });
      test('duration - incorrect', async () => {
        const e = errors[2];
        const data = {
          property: 'duration',
          errorList: {
            isString: 'The duration is incorrect',
            isNotEmpty: 'The duration necessarily is required',
          },
        };
        expect(e.property).toEqual(data.property);
        expect(e.errorList.isNotEmpty).toBeDefined();
        expect(e.errorList.isNotEmpty).toEqual(data.errorList.isNotEmpty);
        expect(e.errorList.isString).toBeDefined();
        expect(e.errorList.isString).toEqual(data.errorList.isString);
      });
      test('name - incorrect', async () => {
        const e = errors[3];
        const data = {
          property: 'name',
          errorList: {
            isString: 'The name is incorrect',
            isNotEmpty: 'The name necessarily is required',
          },
        };
        expect(e.property).toEqual(data.property);
        expect(e.errorList.isNotEmpty).toBeDefined();
        expect(e.errorList.isNotEmpty).toEqual(data.errorList.isNotEmpty);
        expect(e.errorList.isString).toBeDefined();
        expect(e.errorList.isString).toEqual(data.errorList.isString);
      });
      test('description - incorrect', async () => {
        const e = errors[4];
        const data = {
          property: 'description',
          errorList: {
            isString: 'The description is incorrect',
            isNotEmpty: 'The description necessarily is required',
          },
        };
        expect(e.property).toEqual(data.property);
        expect(e.errorList.isNotEmpty).toBeDefined();
        expect(e.errorList.isNotEmpty).toEqual(data.errorList.isNotEmpty);
        expect(e.errorList.isString).toBeDefined();
        expect(e.errorList.isString).toEqual(data.errorList.isString);
      });
      test('privateData - incorrect', async () => {
        const e = errors[5];
        expect(e.property).toBeDefined();
        expect(e.errorChildren).toBeDefined();
        children = e.errorChildren;
      });
      test('privateData.firstname - incorrect', async () => {
        const data = {
          value: 1111,
          property: 'firstname',
          errorList: { isString: 'The firstname is incorrect' },
        };
        const e = children[0];

        expect(e.errorList).toBeDefined();
        const list = e.errorList;

        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);
        expect(list.isString).toEqual(data.errorList.isString);
      });
      test('privateData.lastname - incorrect', async () => {
        const data = {
          value: 2222,
          property: 'lastname',
          errorList: { isString: 'The lastname is incorrect' },
        };
        const e = children[1];

        expect(e.errorList).toBeDefined();
        const list = e.errorList;

        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);
        expect(list.isString).toEqual(data.errorList.isString);
      });

      test('privateData.photo - incorrect', async () => {
        const data = {
          value: 3333,
          property: 'photo',
          errorList: { isString: 'The photo is incorrect' },
        };
        const e = children[2];

        expect(e.errorList).toBeDefined();
        const list = e.errorList;

        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);
        expect(list.isString).toEqual(data.errorList.isString);
      });

      test('privateData.phone - incorrect', async () => {
        const data = {
          value: 4444,
          property: 'phone',
          errorList: { isString: 'The phone is incorrect' },
        };
        const e = children[3];

        expect(e.errorList).toBeDefined();
        const list = e.errorList;

        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);
        expect(list.isString).toEqual(data.errorList.isString);
      });
      test('privateData.email - incorrect', async () => {
        const data = {
          value: 5555,
          property: 'email',
          errorList: { isEmail: 'The email is incorrect', isString: 'The email is incorrect' },
        };
        const e = children[4];

        expect(e.errorList).toBeDefined();
        const list = e.errorList;

        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);
        expect(list.isEmail).toEqual(data.errorList.isEmail);
        expect(list.isString).toEqual(data.errorList.isString);
      });
      test('privateData.address - incorrect', async () => {
        const data = {
          value: 6666,
          property: 'address',
          errorList: { isString: 'The address is incorrect' },
        };
        const e = children[5];
        expect(e.errorList).toBeDefined();

        const list = e.errorList;

        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);
        expect(list.isString).toEqual(data.errorList.isString);
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

    describe('success', () => {
      const data = {
        status: true,
        payload: send,
      };

      let statusCode;
      let body;
      let payload;

      beforeAll(async () => {
        const res = await query(`/${url}/create`, 'post', send, accessToken);
        statusCode = res.statusCode;
        body = res.body;
        payload = body.payload;
        id = payload.id;
      });

      test('statusCode and status', () => {
        expect(statusCode).toBe(200);
        expect(body.status).toEqual(data.status);
      });

      test('id', () => {
        expect(payload.id).toBeDefined();
        expect(payload.id.length).toEqual(24);
      });
      test('certificates', () => {
        expect(payload.certificates).toBeDefined();
        expect(payload.certificates.length).toEqual(1);
        expect(payload.certificates[0]).toContain(data.payload.certificates[0]);
      });
      test('duration', () => {
        expect(payload.duration).toBeDefined();
        expect(payload.duration).toEqual(data.payload.duration);
      });
      test('name', () => {
        expect(payload.name).toBeDefined();
        expect(payload.name).toEqual(data.payload.name);
      });
      test('description', () => {
        expect(payload.description).toBeDefined();
        expect(payload.description).toEqual(data.payload.description);
      });
      test('status', () => {
        expect(payload.status).toBeDefined();
        expect(payload.status).toEqual(data.payload.status);
      });
      test('position', () => {
        expect(payload.position).toBeDefined();
        expect(payload.position).toEqual(data.payload.position);
      });
      test('privateData', () => {
        expect(payload.privateData).toBeDefined();
      });
      test('privateData.firstname', () => {
        const privateData = payload.privateData;
        const firstname = data.payload.privateData.firstname;
        expect(privateData.firstname).toBeDefined();
        expect(privateData.firstname).toEqual(firstname);
      });
      test('privateData.lastname', () => {
        const privateData = payload.privateData;
        const lastname = data.payload.privateData.lastname;
        expect(privateData.lastname).toBeDefined();
        expect(privateData.lastname).toEqual(lastname);
      });
      test('privateData.photo', () => {
        const privateData = payload.privateData;
        const photo = data.payload.privateData.photo;
        expect(privateData.photo).toBeDefined();
        expect(privateData.photo).toEqual(photo);
      });
      test('privateData.phone', () => {
        const privateData = payload.privateData;
        const phone = data.payload.privateData.phone;
        expect(privateData.phone).toBeDefined();
        expect(privateData.phone).toEqual(phone);
      });
      test('privateData.email', () => {
        const privateData = payload.privateData;
        const email = data.payload.privateData.email;
        expect(privateData.email).toBeDefined();
        expect(privateData.email).toEqual(email);
      });
      test('privateData.address', () => {
        const privateData = payload.privateData;
        const address = data.payload.privateData.address;
        expect(privateData.address).toBeDefined();
        expect(privateData.address).toEqual(address);
      });
    });

    test('error', async () => {
      const data = {
        status: false,
        payload: {
          status: 422,
          defaultMessage: 'Unprocessable Entity',
          message: 'This author exists',
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
    });
    test('not found', async () => {
      const data = {
        status: false,
        payload: {
          status: 404,
          defaultMessage: 'Not Found',
          message: 'This author not found',
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
      let statusCode;
      let body;
      let payload;
      let errors;
      let children;

      beforeAll(async () => {
        const res = await query(`/${url}/update`, 'patch', IsNotCorrectDate, accessToken);
        statusCode = res.statusCode;
        body = res.body;
        payload = body.payload;
        errors = body.payload.errors;
      });

      test('status code and status', () => {
        expect(statusCode).toBe(422);
        expect(body.status).toEqual(false);
      });
      test('errors defined', () => {
        expect(payload.errors).toBeDefined();
      });
      test('id - incorrect', () => {
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
      test('certificates - incorrect', () => {
        const e = errors[1];
        const data = {
          value: [11111],
          property: 'certificates',
          errorList: { isString: 'The certificates  is incorrect' },
        };
        expect(e.value).toContain(data.value[0]);
        expect(e.property).toEqual(data.property);
        expect(e.errorList.isString).toBeDefined();
        expect(e.errorList.isString).toEqual(data.errorList.isString);
      });
      test('author status - incorrect', () => {
        const e = errors[2];
        const data = {
          value: 5555,
          property: 'status',
          errorList: {
            isEnum: 'The status is incorrect and should have: working,no-working,looking,considering',
          },
        };
        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);
        expect(e.errorList.isEnum).toBeDefined();
        expect(e.errorList.isEnum).toEqual(data.errorList.isEnum);
      });

      test('position - incorrect', () => {
        const e = errors[3];
        const data = {
          value: 6666,
          property: 'position',
          errorList: {
            isEnum: 'The position is incorrect and should have: Frontend,Backend,DevOps,Full-stack,Mobile',
          },
        };
        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);
        expect(e.errorList.isEnum).toBeDefined();
        expect(e.errorList.isEnum).toEqual(data.errorList.isEnum);
      });
      test('duration - incorrect', () => {
        const e = errors[4];
        const data = {
          value: 222222,
          property: 'duration',
          errorList: { isString: 'The duration is incorrect' },
        };
        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);
        expect(e.errorList.isString).toBeDefined();
        expect(e.errorList.isString).toEqual(data.errorList.isString);
      });
      test('name - incorrect', () => {
        const e = errors[5];
        const data = {
          value: 33333,
          property: 'name',
          errorList: { isString: 'The name is incorrect' },
        };
        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);
        expect(e.errorList.isString).toBeDefined();
        expect(e.errorList.isString).toEqual(data.errorList.isString);
      });
      test('description - incorrect', () => {
        const e = errors[6];
        const data = {
          value: 4444,
          property: 'description',
          errorList: { isString: 'The description is incorrect' },
        };
        expect(e.property).toEqual(data.property);
        expect(e.value).toEqual(data.value);
        expect(e.errorList.isString).toBeDefined();
        expect(e.errorList.isString).toEqual(data.errorList.isString);
      });
      test('privateData - incorrect', () => {
        const e = errors[7];
        expect(e.property).toBeDefined();
        expect(e.errorChildren).toBeDefined();
        children = e.errorChildren;
      });
      test('privateData.firstname - incorrect', () => {
        const data = {
          value: IsNotCorrectDate.privateData.firstname,
          property: 'firstname',
          errorList: { isString: 'The firstname is incorrect' },
        };
        const e = children[0];

        expect(e.errorList).toBeDefined();
        const list = e.errorList;

        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);
        expect(list.isString).toEqual(data.errorList.isString);
      });
      test('privateData.lastname - incorrect', () => {
        const data = {
          value: IsNotCorrectDate.privateData.lastname,
          property: 'lastname',
          errorList: { isString: 'The lastname is incorrect' },
        };
        const e = children[1];

        expect(e.errorList).toBeDefined();
        const list = e.errorList;

        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);
        expect(list.isString).toEqual(data.errorList.isString);
      });

      test('privateData.photo - incorrect', () => {
        const data = {
          value: IsNotCorrectDate.privateData.photo,
          property: 'photo',
          errorList: { isString: 'The photo is incorrect' },
        };
        const e = children[2];

        expect(e.errorList).toBeDefined();
        const list = e.errorList;

        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);
        expect(list.isString).toEqual(data.errorList.isString);
      });

      test('privateData.phone - incorrect', () => {
        const data = {
          value: IsNotCorrectDate.privateData.phone,
          property: 'phone',
          errorList: { isString: 'The phone is incorrect' },
        };
        const e = children[3];

        expect(e.errorList).toBeDefined();
        const list = e.errorList;

        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);
        expect(list.isString).toEqual(data.errorList.isString);
      });
      test('privateData.email - incorrect', () => {
        const data = {
          value: IsNotCorrectDate.privateData.email,
          property: 'email',
          errorList: { isEmail: 'The email is incorrect', isString: 'The email is incorrect' },
        };
        const e = children[4];

        expect(e.errorList).toBeDefined();
        const list = e.errorList;

        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);
        expect(list.isEmail).toEqual(data.errorList.isEmail);
        expect(list.isString).toEqual(data.errorList.isString);
      });
      test('privateData.address - incorrect', () => {
        const data = {
          value: IsNotCorrectDate.privateData.address,
          property: 'address',
          errorList: { isString: 'The address is incorrect' },
        };
        const e = children[5];
        expect(e.errorList).toBeDefined();

        const list = e.errorList;

        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);
        expect(list.isString).toEqual(data.errorList.isString);
      });

      test('addLink - incorrect', () => {
        const e = errors[8];
        const data = {
          value: {},
          property: 'addLink',
          errorList: {
            isMongoId: 'Some identifiers from addLink are incorrect.',
            isArray: 'The addLink is incorrect',
          },
        };
        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);
        expect(e.errorList.isArray).toBeDefined();
        expect(e.errorList.isArray).toEqual(data.errorList.isArray);
        expect(e.errorList.isMongoId).toBeDefined();
        expect(e.errorList.isMongoId).toEqual(data.errorList.isMongoId);
      });
      test('addLanguages - incorrect', () => {
        const e = errors[9];
        const data = {
          value: {},
          property: 'addLanguages',
          errorList: {
            isMongoId: 'Some identifiers from addLanguages are incorrect.',
            isArray: 'The addLanguages is incorrect',
          },
        };
        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);
        expect(e.errorList.isArray).toBeDefined();
        expect(e.errorList.isArray).toEqual(data.errorList.isArray);
        expect(e.errorList.isMongoId).toBeDefined();
        expect(e.errorList.isMongoId).toEqual(data.errorList.isMongoId);
      });
      test('addPlaceWork - incorrect', () => {
        const e = errors[10];
        const data = {
          value: {},
          property: 'addPlaceWork',
          errorList: {
            isMongoId: 'Some identifiers from addPlaceWork are incorrect.',
            isArray: 'The addPlaceWork is incorrect',
          },
        };
        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);
        expect(e.errorList.isArray).toBeDefined();
        expect(e.errorList.isArray).toEqual(data.errorList.isArray);
        expect(e.errorList.isMongoId).toBeDefined();
        expect(e.errorList.isMongoId).toEqual(data.errorList.isMongoId);
      });
      test('removeLink - incorrect', () => {
        const e = errors[11];
        const data = {
          value: {},
          property: 'removeLink',
          errorList: {
            isMongoId: 'Some identifiers from removeLink are incorrect.',
            isArray: 'The removeLink is incorrect',
          },
        };
        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);
        expect(e.errorList.isArray).toBeDefined();
        expect(e.errorList.isArray).toEqual(data.errorList.isArray);
        expect(e.errorList.isMongoId).toBeDefined();
        expect(e.errorList.isMongoId).toEqual(data.errorList.isMongoId);
      });
      test('removeLanguages - incorrect', () => {
        const e = errors[12];
        const data = {
          value: {},
          property: 'removeLanguages',
          errorList: {
            isMongoId: 'Some identifiers from removeLanguages are incorrect.',
            isArray: 'The removeLanguages is incorrect',
          },
        };
        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);
        expect(e.errorList.isArray).toBeDefined();
        expect(e.errorList.isArray).toEqual(data.errorList.isArray);
        expect(e.errorList.isMongoId).toBeDefined();
        expect(e.errorList.isMongoId).toEqual(data.errorList.isMongoId);
      });
      test('removePlaceWork - incorrect', () => {
        const e = errors[13];
        const data = {
          value: {},
          property: 'removePlaceWork',
          errorList: {
            isMongoId: 'Some identifiers from removePlaceWork are incorrect.',
            isArray: 'The removePlaceWork is incorrect',
          },
        };
        expect(e.value).toEqual(data.value);
        expect(e.property).toEqual(data.property);
        expect(e.errorList.isArray).toBeDefined();
        expect(e.errorList.isArray).toEqual(data.errorList.isArray);
        expect(e.errorList.isMongoId).toBeDefined();
        expect(e.errorList.isMongoId).toEqual(data.errorList.isMongoId);
      });
    });
    test('author not found', async () => {
      const data = {
        status: false,
        payload: {
          status: 404,
          defaultMessage: 'Not Found',
          message: 'This author not found',
        },
      };
      const res = await query(`/${url}/update`, 'patch', { id: '6377b287caae55d58a5587d6' }, accessToken);
      const { body, statusCode } = res;
      expect(statusCode).toBe(404);
      expect(body.status).toEqual(data.status);

      const { payload } = body;
      expect(payload.status).toEqual(data.payload.status);
      expect(payload.defaultMessage).toEqual(data.payload.defaultMessage);
      expect(payload.message).toEqual(data.payload.message);
    });

    describe('default data - success', () => {
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
      });

      test('statusCode and status', () => {
        expect(statusCode).toBe(200);
        expect(body.status).toEqual(data.status);
      });

      test('id', () => {
        expect(payload.id).toBeDefined();
        expect(payload.id.length).toEqual(24);
      });
      test('certificates', () => {
        expect(payload.certificates).toBeDefined();
        expect(payload.certificates.length).toEqual(1);
        expect(payload.certificates[0]).toContain(data.payload.certificates[0]);
      });
      test('duration', () => {
        expect(payload.duration).toBeDefined();
        expect(payload.duration).toEqual(data.payload.duration);
      });
      test('name', () => {
        expect(payload.name).toBeDefined();
        expect(payload.name).toEqual(data.payload.name);
      });
      test('description', () => {
        expect(payload.description).toBeDefined();
        expect(payload.description).toEqual(data.payload.description);
      });
      test('status', () => {
        expect(payload.status).toBeDefined();
        expect(payload.status).toEqual(data.payload.status);
      });
      test('position', () => {
        expect(payload.position).toBeDefined();
        expect(payload.position).toEqual(data.payload.position);
      });
      test('privateData', () => {
        expect(payload.privateData).toBeDefined();
      });
      test('privateData.firstname', () => {
        const privateData = payload.privateData;
        const firstname = data.payload.privateData.firstname;
        expect(privateData.firstname).toBeDefined();
        expect(privateData.firstname).toEqual(firstname);
      });
      test('privateData.lastname', () => {
        const privateData = payload.privateData;
        const lastname = data.payload.privateData.lastname;
        expect(privateData.lastname).toBeDefined();
        expect(privateData.lastname).toEqual(lastname);
      });
      test('privateData.photo', () => {
        const privateData = payload.privateData;
        const photo = data.payload.privateData.photo;
        expect(privateData.photo).toBeDefined();
        expect(privateData.photo).toEqual(photo);
      });
      test('privateData.phone', () => {
        const privateData = payload.privateData;
        const phone = data.payload.privateData.phone;
        expect(privateData.phone).toBeDefined();
        expect(privateData.phone).toEqual(phone);
      });
      test('privateData.email', () => {
        const privateData = payload.privateData;
        const email = data.payload.privateData.email;
        expect(privateData.email).toBeDefined();
        expect(privateData.email).toEqual(email);
      });
      test('privateData.address', () => {
        const privateData = payload.privateData;
        const address = data.payload.privateData.address;
        expect(privateData.address).toBeDefined();
        expect(privateData.address).toEqual(address);
      });
    });

    describe('lists - success', () => {
      const sendUpdateList = {
        addLink: [],
        addLanguages: [],
        addPlaceWork: [],
        removeLink: [],
        removeLanguages: [],
        removePlaceWork: [],
      };

      const data = {
        status: true,
        payload: {
          id: id,
        },
      };

      let statusCode;
      let body;
      let payload;

      beforeAll(async () => {
        const res = await query(`/${url}/update`, 'patch', { id: id, ...sendUpdateList }, accessToken);
        statusCode = res.statusCode;
        body = res.body;
        payload = body.payload;
      });

      test('statusCode and status', () => {
        expect(statusCode).toBe(200);
        expect(body.status).toEqual(data.status);
      });

      test('id', () => {
        expect(payload.id).toBeDefined();
        expect(payload.id.length).toEqual(24);
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
        },
      };

      const res = await query(`/${url}/${id}`, 'delete', {}, accessToken);
      const { body, statusCode } = res;
      //const { payload } = body;
      expect(statusCode).toBe(200);
      expect(body.status).toEqual(data.status);
    });

    test('error', async () => {
      const data = {
        status: false,
        payload: {
          status: 404,
          defaultMessage: 'Not Found',
          message: 'This author not found',
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
