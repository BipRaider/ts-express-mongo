import 'reflect-metadata';
import { beforeAll, afterAll, describe, test, expect } from '@jest/globals';

import { query } from '../server';
interface InterfaceList {
  addLink: string[];
  addLanguages: string[];
  addPlaceWork: string[];
  removeLink: string[];
  removeLanguages: string[];
  removePlaceWork: string[];
}

describe('Author e2e', () => {
  const url = 'about';
  const languageUrl = 'language';
  const socialUrl = 'social';
  const placeWorkUrl = 'place-work';
  let id;
  let accessToken;
  let author;
  let idLanguage1;
  let idLanguage2;
  let idLanguage3;
  let idSocial1;
  let idSocial2;
  let idSocial3;
  let idPlaceWork1;
  let idPlaceWork2;
  let idPlaceWork3;

  const send = {
    duration: '12.12.22',
    name: 'My test list delete',
    description: 'lalalqealalala',
    status: 'working',
    position: 'Backend',
  };
  const sendLanguage1 = {
    name: 'Language1',
    level: 'elementary',
    userId: '6377b287caae55d58a5587d6',
  };
  const sendLanguage2 = {
    name: 'Language2',
    level: 'elementary',
    userId: '6377b287caae55d58a5587d6',
  };
  const sendLanguage3 = {
    name: 'Language3',
    level: 'elementary',
    userId: '6377b287caae55d58a5587d6',
  };
  const sendSocial1 = {
    name: 'GitHab',
    link: 'sendSocial_1.com',
    userId: '6377b287caae55d58a5587d6',
  };
  const sendSocial2 = {
    name: 'GitLab',
    link: 'sendSocial_2.com',
    userId: '6377b287caae55d58a5587d6',
  };
  const sendSocial3 = {
    name: 'Linkedin',
    link: 'sendSocial_3.com',
    userId: '6377b287caae55d58a5587d6',
  };
  const sendPlaceWork1 = {
    userId: '6377b287caae55d58a5587d6',
    name: 'sendPlaceWork1',
    description: 'test test',
    link: 'TEST.com',
    start_duration: '11-11-11',
    end_duration: '22-22-22',
    position: 'backend',
    status: true,
  };
  const sendPlaceWork2 = {
    userId: '6377b287caae55d58a5587d6',
    name: 'sendPlaceWork2',
    description: 'test test',
    link: 'TEST.com',
    start_duration: '11-11-11',
    end_duration: '22-22-22',
    position: 'backend',
    status: true,
  };
  const sendPlaceWork3 = {
    userId: '6377b287caae55d58a5587d6',
    name: 'sendPlaceWork3',
    description: 'test test',
    link: 'TEST.com',
    start_duration: '11-11-11',
    end_duration: '22-22-22',
    position: 'backend',
    status: true,
  };

  beforeAll(async () => {
    const userBody = await query('/users/login', 'post', { email: 'the1@1.com', password: '123456789' });
    accessToken = userBody.body.payload.accessToken;

    const authorBody = await query(`/${url}/create`, 'post', send, accessToken);
    author = authorBody.body.payload;
    id = author.id;
    const Language1 = await query(`/${languageUrl}/create`, 'post', sendLanguage1, accessToken);
    const Language2 = await query(`/${languageUrl}/create`, 'post', sendLanguage2, accessToken);
    const Language3 = await query(`/${languageUrl}/create`, 'post', sendLanguage3, accessToken);
    const Social1 = await query(`/${socialUrl}/create`, 'post', sendSocial1, accessToken);
    const Social2 = await query(`/${socialUrl}/create`, 'post', sendSocial2, accessToken);
    const Social3 = await query(`/${socialUrl}/create`, 'post', sendSocial3, accessToken);
    const placeWork1 = await query(`/${placeWorkUrl}/create`, 'post', sendPlaceWork1, accessToken);
    const placeWork2 = await query(`/${placeWorkUrl}/create`, 'post', sendPlaceWork2, accessToken);
    const placeWork3 = await query(`/${placeWorkUrl}/create`, 'post', sendPlaceWork3, accessToken);

    idPlaceWork1 = placeWork1.body.payload.id;
    idPlaceWork2 = placeWork2.body.payload.id;
    idPlaceWork3 = placeWork3.body.payload.id;
    idSocial1 = Social1.body.payload.id;
    idSocial2 = Social2.body.payload.id;
    idSocial3 = Social3.body.payload.id;
    idLanguage1 = Language1.body.payload.id;
    idLanguage2 = Language2.body.payload.id;
    idLanguage3 = Language3.body.payload.id;
  }, 1000);
  describe('All data should be', () => {
    test('id', () => {
      expect(id).not.toBeUndefined();
    });
    test('access token', () => {
      expect(accessToken).not.toBeUndefined();
    });
    test('author', () => {
      expect(author).not.toBeUndefined();
    });
    test('language', () => {
      expect(idLanguage1).not.toBeUndefined();
      expect(idLanguage2).not.toBeUndefined();
      expect(idLanguage3).not.toBeUndefined();
    });

    test('social link', () => {
      expect(idSocial1).not.toBeUndefined();
      expect(idSocial2).not.toBeUndefined();
      expect(idSocial3).not.toBeUndefined();
    });
    test('place work', () => {
      expect(idPlaceWork1).not.toBeUndefined();
      expect(idPlaceWork2).not.toBeUndefined();
      expect(idPlaceWork3).not.toBeUndefined();
    });
  });

  describe('Update', () => {
    const sendUpdateList: InterfaceList = {
      addLink: [],
      addLanguages: [],
      addPlaceWork: [],
      removeLink: [],
      removeLanguages: [],
      removePlaceWork: [],
    };
    beforeAll(async () => {
      sendUpdateList.addLanguages.push(...[idLanguage1, idLanguage2, idLanguage3]);
      sendUpdateList.addLink.push(...[idSocial1, idSocial2, idSocial3]);
      sendUpdateList.addPlaceWork.push(...[idPlaceWork1, idPlaceWork2, idPlaceWork3]);
      sendUpdateList.removeLanguages.push(...[idLanguage1, idLanguage2, idLanguage3]);
      sendUpdateList.removeLink.push(...[idSocial1, idSocial2, idSocial3]);
      sendUpdateList.removePlaceWork.push(...[idPlaceWork1, idPlaceWork2, idPlaceWork3]);
    });
    describe('success', () => {
      let statusCode;
      let body;
      let payload;

      beforeAll(async () => {
        const res = await query(
          `/${url}/update`,
          'patch',
          {
            id: id,
            addLanguages: sendUpdateList.addLanguages,
            addLink: sendUpdateList.addLink,
            addPlaceWork: sendUpdateList.addPlaceWork,
          },
          accessToken,
        );
        statusCode = res.statusCode;
        body = res.body;
        payload = body.payload;
      });
      test('statusCode and status', () => {
        expect(statusCode).toBe(200);
        expect(body.status).toEqual(true);
      });

      test('id', () => {
        expect(payload.id).toBeDefined();
        expect(payload.id.length).toEqual(24);
      });
      describe('Added', () => {
        test('link:', () => {
          expect(payload.link).not.toBeUndefined();
          expect(payload.link.length).toEqual(3);
          expect(payload.link).toContain(sendUpdateList.addLink[0]);
          expect(payload.link).toContain(sendUpdateList.addLink[1]);
          expect(payload.link).toContain(sendUpdateList.addLink[2]);
        });
        test('place_work:', () => {
          expect(payload.place_work).not.toBeUndefined();
          expect(payload.place_work.length).toEqual(3);
          expect(payload.place_work).toContain(sendUpdateList.addPlaceWork[0]);
          expect(payload.place_work).toContain(sendUpdateList.addPlaceWork[1]);
          expect(payload.place_work).toContain(sendUpdateList.addPlaceWork[2]);
        });
        test('languages: ', () => {
          expect(payload.languages).not.toBeUndefined();
          expect(payload.languages.length).toEqual(3);
          expect(payload.languages).toContain(sendUpdateList.addLanguages[0]);
          expect(payload.languages).toContain(sendUpdateList.addLanguages[1]);
          expect(payload.languages).toContain(sendUpdateList.addLanguages[2]);
        });
      });
      describe('Remove languages', () => {
        test('1 removed: ', async () => {
          const res = await query(`/${url}/update`, 'patch', { id: id, removeLanguages: [idLanguage1] }, accessToken);
          const statusCode = res.statusCode;
          const body = res.body;
          expect(statusCode).toBe(200);
          expect(body.status).toEqual(true);

          const payload = body.payload;

          expect(payload.languages).not.toBeUndefined();
          expect(payload.languages.length).toEqual(2);
          expect(payload.languages).not.toContain(idLanguage1);
          expect(payload.languages).toContain(idLanguage2);
          expect(payload.languages).toContain(idLanguage3);
        });
        test(`1 should be removed`, async () => {
          const data = {
            status: false,
            payload: {
              status: 404,
              defaultMessage: 'Not Found',
              message: 'This Language not found',
            },
          };

          const res = await query(`/${languageUrl}/${idLanguage1}`, 'get', {}, accessToken);
          const { body, statusCode } = res;
          expect(statusCode).toBe(404);
          expect(body.status).toEqual(data.status);

          const { payload } = body;
          expect(payload.status).toEqual(data.payload.status);
          expect(payload.defaultMessage).toEqual(data.payload.defaultMessage);
          expect(payload.message).toEqual(data.payload.message);
        });
        test('2 and 3 removed: ', async () => {
          const res = await query(
            `/${url}/update`,
            'patch',
            {
              id: id,
              removeLanguages: [idLanguage2, idLanguage3],
            },
            accessToken,
          );
          const statusCode = res.statusCode;
          const body = res.body;
          expect(statusCode).toBe(200);
          expect(body.status).toEqual(true);

          const payload = body.payload;

          expect(payload.languages).not.toBeUndefined();
          expect(payload.languages.length).toEqual(0);
          expect(payload.languages).not.toContain(idLanguage2);
          expect(payload.languages).not.toContain(idLanguage3);
        });
        test(`2 should be removed`, async () => {
          const data = {
            status: false,
            payload: {
              status: 404,
              defaultMessage: 'Not Found',
              message: 'This Language not found',
            },
          };

          const res = await query(`/${languageUrl}/${idLanguage2}`, 'get', {}, accessToken);
          const { body, statusCode } = res;
          expect(statusCode).toBe(404);
          expect(body.status).toEqual(data.status);

          const { payload } = body;
          expect(payload.status).toEqual(data.payload.status);
          expect(payload.defaultMessage).toEqual(data.payload.defaultMessage);
          expect(payload.message).toEqual(data.payload.message);
        });
        test(`3 should be removed`, async () => {
          const data = {
            status: false,
            payload: {
              status: 404,
              defaultMessage: 'Not Found',
              message: 'This Language not found',
            },
          };

          const res = await query(`/${languageUrl}/${idLanguage3}`, 'get', {}, accessToken);
          const { body, statusCode } = res;
          expect(statusCode).toBe(404);
          expect(body.status).toEqual(data.status);

          const { payload } = body;
          expect(payload.status).toEqual(data.payload.status);
          expect(payload.defaultMessage).toEqual(data.payload.defaultMessage);
          expect(payload.message).toEqual(data.payload.message);
        });
      });
      describe('Remove social', () => {
        test('1 removed: ', async () => {
          const res = await query(`/${url}/update`, 'patch', { id: id, removeLink: [idSocial1] }, accessToken);
          const statusCode = res.statusCode;
          const body = res.body;
          expect(statusCode).toBe(200);
          expect(body.status).toEqual(true);

          const payload = body.payload;

          expect(payload.link).not.toBeUndefined();
          expect(payload.link.length).toEqual(2);
          expect(payload.link).not.toContain(idSocial1);
          expect(payload.link).toContain(idSocial2);
          expect(payload.link).toContain(idSocial3);
        });
        test(`1 should be removed`, async () => {
          const data = {
            status: false,
            payload: {
              status: 404,
              defaultMessage: 'Not Found',
              message: 'This Sociol link not found',
            },
          };

          const res = await query(`/${socialUrl}/${idSocial1}`, 'get', {}, accessToken);
          const { body, statusCode } = res;
          expect(statusCode).toBe(404);
          expect(body.status).toEqual(data.status);

          const { payload } = body;
          expect(payload.status).toEqual(data.payload.status);
          expect(payload.defaultMessage).toEqual(data.payload.defaultMessage);
          expect(payload.message).toEqual(data.payload.message);
        });
        test('2 and 3 removed: ', async () => {
          const res = await query(
            `/${url}/update`,
            'patch',
            {
              id: id,
              removeLink: [idSocial2, idSocial3],
            },
            accessToken,
          );
          const statusCode = res.statusCode;
          const body = res.body;
          expect(statusCode).toBe(200);
          expect(body.status).toEqual(true);

          const payload = body.payload;

          expect(payload.link).not.toBeUndefined();
          expect(payload.link.length).toEqual(0);
          expect(payload.link).not.toContain(idSocial2);
          expect(payload.link).not.toContain(idSocial3);
        });
        test(`2 should be removed`, async () => {
          const data = {
            status: false,
            payload: {
              status: 404,
              defaultMessage: 'Not Found',
              message: 'This Sociol link not found',
            },
          };

          const res = await query(`/${socialUrl}/${idSocial2}`, 'get', {}, accessToken);
          const { body, statusCode } = res;
          expect(statusCode).toBe(404);
          expect(body.status).toEqual(data.status);

          const { payload } = body;
          expect(payload.status).toEqual(data.payload.status);
          expect(payload.defaultMessage).toEqual(data.payload.defaultMessage);
          expect(payload.message).toEqual(data.payload.message);
        });
        test(`3 should be removed`, async () => {
          const data = {
            status: false,
            payload: {
              status: 404,
              defaultMessage: 'Not Found',
              message: 'This Sociol link not found',
            },
          };

          const res = await query(`/${socialUrl}/${idSocial3}`, 'get', {}, accessToken);
          const { body, statusCode } = res;
          expect(statusCode).toBe(404);
          expect(body.status).toEqual(data.status);

          const { payload } = body;
          expect(payload.status).toEqual(data.payload.status);
          expect(payload.defaultMessage).toEqual(data.payload.defaultMessage);
          expect(payload.message).toEqual(data.payload.message);
        });
      });
      describe('Remove place work', () => {
        test('1 removed: ', async () => {
          const res = await query(`/${url}/update`, 'patch', { id: id, removePlaceWork: [idPlaceWork1] }, accessToken);
          const statusCode = res.statusCode;
          const body = res.body;
          expect(statusCode).toBe(200);
          expect(body.status).toEqual(true);

          const payload = body.payload;

          expect(payload.place_work).not.toBeUndefined();
          expect(payload.place_work.length).toEqual(2);
          expect(payload.place_work).not.toContain(idPlaceWork1);
          expect(payload.place_work).toContain(idPlaceWork2);
          expect(payload.place_work).toContain(idPlaceWork3);
        });
        test(`1 should be removed`, async () => {
          const data = {
            status: false,
            payload: {
              status: 404,
              defaultMessage: 'Not Found',
              message: 'This Place work not found',
            },
          };

          const res = await query(`/${placeWorkUrl}/${idPlaceWork1}`, 'get', {}, accessToken);
          const { body, statusCode } = res;
          expect(statusCode).toBe(404);
          expect(body.status).toEqual(data.status);

          const { payload } = body;
          expect(payload.status).toEqual(data.payload.status);
          expect(payload.defaultMessage).toEqual(data.payload.defaultMessage);
          expect(payload.message).toEqual(data.payload.message);
        });
        test('2 and 3 removed: ', async () => {
          const res = await query(
            `/${url}/update`,
            'patch',
            {
              id: id,
              removePlaceWork: [idPlaceWork2, idPlaceWork3],
            },
            accessToken,
          );
          const statusCode = res.statusCode;
          const body = res.body;
          expect(statusCode).toBe(200);
          expect(body.status).toEqual(true);

          const payload = body.payload;

          expect(payload.place_work).not.toBeUndefined();
          expect(payload.place_work.length).toEqual(0);
          expect(payload.place_work).not.toContain(idPlaceWork2);
          expect(payload.place_work).not.toContain(idPlaceWork3);
        });
        test(`2 should be removed`, async () => {
          const data = {
            status: false,
            payload: {
              status: 404,
              defaultMessage: 'Not Found',
              message: 'This Place work not found',
            },
          };

          const res = await query(`/${placeWorkUrl}/${idPlaceWork2}`, 'get', {}, accessToken);
          const { body, statusCode } = res;
          expect(statusCode).toBe(404);
          expect(body.status).toEqual(data.status);

          const { payload } = body;
          expect(payload.status).toEqual(data.payload.status);
          expect(payload.defaultMessage).toEqual(data.payload.defaultMessage);
          expect(payload.message).toEqual(data.payload.message);
        });
        test(`3 should be removed`, async () => {
          const data = {
            status: false,
            payload: {
              status: 404,
              defaultMessage: 'Not Found',
              message: 'This Place work not found',
            },
          };

          const res = await query(`/${placeWorkUrl}/${idPlaceWork3}`, 'get', {}, accessToken);
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
  });

  describe('Remove language', () => {
    const sendUpdateList: InterfaceList = {
      addLink: [],
      addLanguages: [],
      addPlaceWork: [],
      removeLink: [],
      removeLanguages: [],
      removePlaceWork: [],
    };
    let idLanguage1;
    let idLanguage2;
    let idLanguage3;
    let statusCode;

    beforeAll(async () => {
      const Language1 = await query(`/${languageUrl}/create`, 'post', sendLanguage1, accessToken);
      const Language2 = await query(`/${languageUrl}/create`, 'post', sendLanguage2, accessToken);
      const Language3 = await query(`/${languageUrl}/create`, 'post', sendLanguage3, accessToken);
      idLanguage1 = Language1.body.payload.id;
      idLanguage2 = Language2.body.payload.id;
      idLanguage3 = Language3.body.payload.id;

      sendUpdateList.addLanguages.push(...[idLanguage1, idLanguage2, idLanguage3]);

      const res = await query(
        `/${url}/update`,
        'patch',
        { id: id, addLanguages: [idLanguage1, idLanguage2, idLanguage3] },
        accessToken,
      );
      statusCode = res.statusCode;
    }, 2000);

    test('language', () => {
      expect(statusCode).toEqual(200);
      expect(idLanguage1).not.toBeUndefined();
      expect(idLanguage2).not.toBeUndefined();
      expect(idLanguage3).not.toBeUndefined();
    });

    test('1 removed', async () => {
      const res = await query(`/${languageUrl}/${idLanguage1}`, 'delete', {}, accessToken);
      const { body, statusCode } = res;
      const { payload } = body;
      expect(statusCode).toBe(200);
      expect(body.status).toEqual(true);
      expect(payload.id).toEqual(idLanguage1);
    });
    test('2 removed', async () => {
      const res = await query(`/${languageUrl}/${idLanguage2}`, 'delete', {}, accessToken);
      const { body, statusCode } = res;
      const { payload } = body;
      expect(statusCode).toBe(200);
      expect(body.status).toEqual(true);
      expect(payload.id).toEqual(idLanguage2);
    });
    test('3 removed', async () => {
      const res = await query(`/${languageUrl}/${idLanguage3}`, 'delete', {}, accessToken);
      const { body, statusCode } = res;
      const { payload } = body;
      expect(statusCode).toBe(200);
      expect(body.status).toEqual(true);
      expect(payload.id).toEqual(idLanguage3);
    });
  });
  describe('Remove social', () => {
    const sendUpdateList: InterfaceList = {
      addLink: [],
      addLanguages: [],
      addPlaceWork: [],
      removeLink: [],
      removeLanguages: [],
      removePlaceWork: [],
    };
    let idSocial1;
    let idSocial2;
    let idSocial3;
    let statusCode;

    beforeAll(async () => {
      const Social1 = await query(`/${socialUrl}/create`, 'post', sendSocial1, accessToken);
      const Social2 = await query(`/${socialUrl}/create`, 'post', sendSocial2, accessToken);
      const Social3 = await query(`/${socialUrl}/create`, 'post', sendSocial3, accessToken);
      idSocial1 = Social1.body.payload.id;
      idSocial2 = Social2.body.payload.id;
      idSocial3 = Social3.body.payload.id;

      sendUpdateList.addLink.push(...[idSocial1, idSocial2, idSocial3]);

      const res = await query(`/${url}/update`, 'patch', { id: id, ...sendUpdateList }, accessToken);
      statusCode = res.statusCode;
    }, 2000);

    test('social link', () => {
      expect(statusCode).toEqual(200);
      expect(idSocial1).not.toBeUndefined();
      expect(idSocial2).not.toBeUndefined();
      expect(idSocial3).not.toBeUndefined();
    });

    test('1 removed', async () => {
      const res = await query(`/${socialUrl}/${idSocial1}`, 'delete', {}, accessToken);
      const { body, statusCode } = res;
      const { payload } = body;
      expect(statusCode).toBe(200);
      expect(body.status).toEqual(true);
      expect(payload.id).toEqual(idSocial1);
    });
    test('2 removed', async () => {
      const res = await query(`/${socialUrl}/${idSocial2}`, 'delete', {}, accessToken);
      const { body, statusCode } = res;
      const { payload } = body;
      expect(statusCode).toBe(200);
      expect(body.status).toEqual(true);
      expect(payload.id).toEqual(idSocial2);
    });
    test('3 removed', async () => {
      const res = await query(`/${socialUrl}/${idSocial3}`, 'delete', {}, accessToken);
      const { body, statusCode } = res;
      const { payload } = body;
      expect(statusCode).toBe(200);
      expect(body.status).toEqual(true);
      expect(payload.id).toEqual(idSocial3);
    });
  });
  describe('Remove place work', () => {
    const sendUpdateList: InterfaceList = {
      addLink: [],
      addLanguages: [],
      addPlaceWork: [],
      removeLink: [],
      removeLanguages: [],
      removePlaceWork: [],
    };

    let idPlaceWork1;
    let idPlaceWork2;
    let idPlaceWork3;
    let statusCode;

    beforeAll(async () => {
      const placeWork1 = await query(`/${placeWorkUrl}/create`, 'post', sendPlaceWork1, accessToken);
      const placeWork2 = await query(`/${placeWorkUrl}/create`, 'post', sendPlaceWork2, accessToken);
      const placeWork3 = await query(`/${placeWorkUrl}/create`, 'post', sendPlaceWork3, accessToken);
      idPlaceWork1 = placeWork1.body.payload.id;
      idPlaceWork2 = placeWork2.body.payload.id;
      idPlaceWork3 = placeWork3.body.payload.id;

      sendUpdateList.addPlaceWork.push(...[idPlaceWork1, idPlaceWork2, idPlaceWork3]);

      const res = await query(`/${url}/update`, 'patch', { id: id, ...sendUpdateList }, accessToken);
      statusCode = res.statusCode;
    }, 2000);
    test('place work id', () => {
      expect(statusCode).toEqual(200);
      expect(idPlaceWork1).not.toBeUndefined();
      expect(idPlaceWork2).not.toBeUndefined();
      expect(idPlaceWork3).not.toBeUndefined();
    });
    test('1 removed', async () => {
      const res = await query(`/${placeWorkUrl}/${idPlaceWork1}`, 'delete', {}, accessToken);
      const { body, statusCode } = res;
      const { payload } = body;
      expect(statusCode).toBe(200);
      expect(body.status).toEqual(true);
      expect(payload.id).toEqual(idPlaceWork1);
    });
    test('2 removed', async () => {
      const res = await query(`/${placeWorkUrl}/${idPlaceWork2}`, 'delete', {}, accessToken);
      const { body, statusCode } = res;
      const { payload } = body;
      expect(statusCode).toBe(200);
      expect(body.status).toEqual(true);
      expect(payload.id).toEqual(idPlaceWork2);
    });
    test('3 removed', async () => {
      const res = await query(`/${placeWorkUrl}/${idPlaceWork3}`, 'delete', {}, accessToken);
      const { body, statusCode } = res;
      const { payload } = body;
      expect(statusCode).toBe(200);
      expect(body.status).toEqual(true);
      expect(payload.id).toEqual(idPlaceWork3);
    });
  });

  afterAll(async () => {
    await query(`/${url}/${id}`, 'delete', {}, accessToken);
  }, 1000);
});
