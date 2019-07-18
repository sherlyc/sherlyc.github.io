import * as supertest from 'supertest';

describe('Experiment API', () => {
  const experimentApi = '/spade/api/experiment';
  const app = require('../app').default;

  it('should return control by default when experiment and valid lottery number is provided', async () => {
    const response: supertest.Response = await supertest(app).get(
      `${experimentApi}/Experiment/50`
    );

    const { text, status } = response;

    expect(status).toBe(200);
    expect(text).toBe('control');
  });
});
