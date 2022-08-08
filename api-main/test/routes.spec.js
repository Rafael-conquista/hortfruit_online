import supertest from 'supertest';
import app from '../src/index.js';

describe('FruitsRoute', () => {
  test('Should response with 200 status code', async () => {
    const response = await supertest(app).get('/fruits');
    expect(response.statusCode).toEqual(200);
  });
});

describe('HealthRoute', () => {
  test('Should response with 200 status code', async () => {
    const response = await supertest(app).get('/health');
    expect(response.statusCode).toEqual(200);
  });
});