import * as supertest from 'supertest';

describe('Feature API', () => {
  const experimentApi = '/spade/api/feature';
  const app = require('../app').default;

  it('should return false by default when feature name and valid lottery number is provided', async () => {
    const response: supertest.Response = await supertest(app).get(
      `${experimentApi}/Feature/50`
    );

    const { body, status } = response;

    expect(status).toBe(200);
    expect(body).toBe(false);
  });
});
