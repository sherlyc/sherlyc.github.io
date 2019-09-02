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

  it('should return TopStoriesVisualExperiment when lottery number is 404 for Users', async () => {
    const response: supertest.Response = await supertest(app).get(
      `${experimentApi}/Users/404`
    );

    const { text, status } = response;

    expect(status).toBe(200);
    expect(text).toBe('TopStoriesVisualExperiment');
  });

  it('should return groupOne when lottery number is 404 and device is mobile for TopStoriesVisualExperiment', async () => {
    const response: supertest.Response = await supertest(app).get(
      `${experimentApi}/TopStoriesVisualExperiment/404/mobile`
    );

    const { text, status } = response;

    expect(status).toBe(200);
    expect(text).toBe('groupOne');
  });

  it('should return groupTwo when lottery number is 505 and device is mobile for TopStoriesVisualExperiment', async () => {
    const response: supertest.Response = await supertest(app).get(
      `${experimentApi}/TopStoriesVisualExperiment/505/mobile`
    );

    const { text, status } = response;

    expect(status).toBe(200);
    expect(text).toBe('groupTwo');
  });

  it('should return control when device is not mobile for TopStoriesVisualExperiment', async () => {
    const response: supertest.Response = await supertest(app).get(
      `${experimentApi}/TopStoriesVisualExperiment/404/tablet`
    );

    const { text, status } = response;

    expect(status).toBe(200);
    expect(text).toBe('control');
  });

  it('should return control when lottery number is not 404 or 505 for TopStoriesVisualExperiment', async () => {
    const response: supertest.Response = await supertest(app).get(
      `${experimentApi}/TopStoriesVisualExperiment/10/mobile`
    );

    const { text, status } = response;

    expect(status).toBe(200);
    expect(text).toBe('control');
  });
});
