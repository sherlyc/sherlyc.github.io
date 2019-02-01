import * as supertest from 'supertest';

describe('dummy api test', () => {
  it('should respond with a json payload', async () => {
    const app = require('../server-src/app').default;
    const response: supertest.Response = await supertest(app)
      .get('/api/')
      .set('Accept', 'application/json');

    expect(response.ok).toBeTruthy();
    expect(response.header['content-type']).toMatch(/application\/json/);
    expect((response.body as any[]).length).toBeGreaterThan(0);
  });
});
