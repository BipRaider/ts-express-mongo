import 'reflect-metadata';
import { beforeAll, describe, test, expect } from '@jest/globals';

import { query } from '../server';

describe('Many request', () => {
  const queryTimes = 1000;
  const usersUrl = 'users';
  const skillUrl = 'skill';
  const libraryUrl = 'library';
  // const projectUrl = 'project';
  const placeWorkUrl = 'place-work';
  const socialUrl = 'social';
  const languageUrl = 'language';
  const aboutUrl = 'about';

  let accessToken: string;

  beforeAll(async () => {
    const res = await query(`/${usersUrl}/login`, 'post', { email: 'the1@1.com', password: '123456789' });
    const { body } = res;
    const { payload } = body;
    accessToken = payload.accessToken;
  });

  test('user login many query', async () => {
    const res: any[] = [];
    for (let i = 0; i < queryTimes; i++) {
      const user = query(`/${usersUrl}/login`, 'post', { email: 'the1@1.com', password: '123456789' });
      res.push(user);
    }

    const dataList = await Promise.all(res);
    for (let i = 0; i < dataList.length; i++) {
      let res = dataList[i];
      const { body, statusCode } = res;
      expect(statusCode).toBe(200);
      expect(body.status).toEqual(true);
    }
  }, 20_000);
  test('skill find many query', async () => {
    const id = '6363ff365b2d5d23e73edbe2';
    const res: any[] = [];
    for (let i = 0; i < queryTimes; i++) {
      const data = query(`/${skillUrl}/${id}`, 'get', {}, accessToken);
      res.push(data);
    }

    const dataList = await Promise.all(res);
    for (let i = 0; i < dataList.length; i++) {
      let res = dataList[i];

      const { body, statusCode } = res;
      expect(statusCode).toBe(200);
      expect(body.status).toEqual(true);
    }
  }, 20_000);
  test('library find many query', async () => {
    const id = '636667912655c1cd68aef5eb';
    const res: any[] = [];
    for (let i = 0; i < queryTimes; i++) {
      const data = query(`/${libraryUrl}/${id}`, 'get', {}, accessToken);
      res.push(data);
    }

    const dataList = await Promise.all(res);
    for (let i = 0; i < dataList.length; i++) {
      let res = dataList[i];

      const { body, statusCode } = res;
      expect(statusCode).toBe(200);
      expect(body.status).toEqual(true);
    }
  }, 20_000);
  //   test('project find many query', async () => {
  //     const id = '';
  //     const res: any[] = [];
  //     for (let i = 0; i < queryTimes; i++) {
  //       const data = query(`/${projectUrl}/${id}`, 'get', {}, accessToken);
  //       res.push(data);
  //     }

  //     const dataList = await Promise.all(res);
  //     for (let i = 0; i < dataList.length; i++) {
  //       let res = dataList[i];

  //       const { body, statusCode } = res;
  //       expect(statusCode).toBe(200);
  //       expect(body.status).toEqual(true);
  //     }
  //   }, 100_000);
  test('language find many query', async () => {
    const id = '637f8856d4ddb94a4dde50f3';
    const res: any[] = [];
    for (let i = 0; i < queryTimes; i++) {
      const data = query(`/${languageUrl}/${id}`, 'get', {}, accessToken);
      res.push(data);
    }

    const dataList = await Promise.all(res);
    for (let i = 0; i < dataList.length; i++) {
      let res = dataList[i];

      const { body, statusCode } = res;
      expect(statusCode).toBe(200);
      expect(body.status).toEqual(true);
      expect(body.payload.id).toEqual(id);
    }
  }, 100_000);
  test('social find many query', async () => {
    const id = '637f88f1d4ddb94a4dde50f6';
    const res: any[] = [];
    for (let i = 0; i < queryTimes; i++) {
      const data = query(`/${socialUrl}/${id}`, 'get', {}, accessToken);
      res.push(data);
    }

    const dataList = await Promise.all(res);
    for (let i = 0; i < dataList.length; i++) {
      let res = dataList[i];

      const { body, statusCode } = res;
      expect(statusCode).toBe(200);
      expect(body.status).toEqual(true);
    }
  }, 20_000);
  test('placeWor find many query', async () => {
    const id = '63809dfdee2b85d4bead3bc0';
    const res: any[] = [];
    for (let i = 0; i < queryTimes; i++) {
      const data = query(`/${placeWorkUrl}/${id}`, 'get', {}, accessToken);
      res.push(data);
    }

    const dataList = await Promise.all(res);
    for (let i = 0; i < dataList.length; i++) {
      let res = dataList[i];

      const { body, statusCode } = res;
      expect(statusCode).toBe(200);
      expect(body.status).toEqual(true);
    }
  }, 100_000);
  test('about find many query', async () => {
    const id = '636fd3b3ccf333f491794967';
    const res: any[] = [];
    for (let i = 0; i < queryTimes; i++) {
      const data = query(`/${aboutUrl}/${id}`, 'get', {}, accessToken);
      res.push(data);
    }

    const dataList = await Promise.all(res);
    for (let i = 0; i < dataList.length; i++) {
      let res = dataList[i];

      const { body, statusCode } = res;
      expect(statusCode).toBe(200);
      expect(body.status).toEqual(true);
      expect(body.payload.id).toEqual(id);
    }
  }, 20_000);
  test('many query', async () => {
    const res: any[] = [];
    for (let i = 0; i < 500; i++) {
      const user = query(`/${usersUrl}/login`, 'post', { email: 'the1@1.com', password: '123456789' });
      const about = query(`/${aboutUrl}/636fd3b3ccf333f491794967`, 'get', {}, accessToken);
      const social = query(`/${socialUrl}/637f88f1d4ddb94a4dde50f6`, 'get', {}, accessToken);
      res.push(user, social, about);
    }

    const res1: any[] = [];
    for (let i = 0; i < 500; i++) {
      const language = query(`/${languageUrl}/637f8856d4ddb94a4dde50f3`, 'get', {}, accessToken);
      const library = query(`/${libraryUrl}/636667912655c1cd68aef5eb`, 'get', {}, accessToken);
      const skill = query(`/${skillUrl}/6363ff365b2d5d23e73edbe2`, 'get', {}, accessToken);
      res1.push(skill, library, language);
    }

    const dataList = await Promise.all(res);
    const dataList1 = await Promise.all(res);

    const data = [...dataList, ...dataList1];

    for (let i = 0; i < data.length; i++) {
      let res = data[i];
      const { body, statusCode } = res;
      expect(statusCode).toBe(200);
      expect(body.status).toEqual(true);
    }
  }, 20_000);
});
