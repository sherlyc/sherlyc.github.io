import * as supertest from 'supertest';

describe('Experiment API', () => {
  const experimentApi = '/spade/api/experiment';
  const app = require('../app').default;

  it('should return valid response when existing experiment and valid lottery number is provided', async () => {
    const response: supertest.Response = await supertest(app)
      .get(experimentApi)
      .query({ name: 'Toucan', lotteryNumber: 50 });

    const { body, status } = response;
    expect(status).toBe(200);
    expect(body).toBeTruthy();
  });

  it('should return 400 status code when invalid experiment and invalid lottery number is provided', async () => {
    const response: supertest.Response = await supertest(app)
      .get(experimentApi)
      .query({ name: '', lotteryNumber: -1 });

    expect(response.status).toBe(400);
  });

  it('should return 200 control when non existing experiment name is provided', async () => {
    const response: supertest.Response = await supertest(app)
      .get(experimentApi)
      .query({ name: 'German', lotteryNumber: 50 });

    expect(response.status).toBe(200);
  });
});
