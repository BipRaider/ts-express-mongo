import request from 'supertest';

export const query = async (url, methods, data, token = '') => {
  const { statusCode, body } = await request('http://localhost:8001')
    [methods](url)
    .set('Accept', 'application/json')
    .set('Origin', 'https://www.bipgo.pw')
    .set('Authorization', `Bearer ${token}`)
    .send(data);
  return { statusCode, body };
};
