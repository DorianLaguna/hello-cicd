const request = require('supertest');
const app = require('../src/index');

describe('GET /health', () => {
  test('responde ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});

describe('GET /add', () => {
  test('suma correctamente', async () => {
    const res = await request(app).get('/add?a=2&b=3');
    expect(res.status).toBe(200);
    expect(res.body.result).toBe(5);
  });

  test('rechaza valores no numericos', async () => {
    const res = await request(app).get('/add?a=x&b=3');
    expect(res.status).toBe(400);
  });
});
