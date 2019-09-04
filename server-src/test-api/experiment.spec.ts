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

  test.each([[1], [100]])(
    'lottery number %i should return TopStoriesVisualExperiment variant for Users experiment for mobile',
    async (lotteryNumber: number) => {
      const response: supertest.Response = await supertest(app).get(
        `${experimentApi}/Users/${lotteryNumber}/mobile`
      );

      const { text, status } = response;

      expect(status).toBe(200);
      expect(text).toBe('TopStoriesVisualExperiment');
    }
  );

  test.each([[1], [34], [404]])(
    'lottery number %i should return groupOne when it is between 1 and 34 or is 404 and device is mobile for TopStoriesVisualExperiment',
    async (lotteryNumber: number) => {
      const response: supertest.Response = await supertest(app).get(
        `${experimentApi}/TopStoriesVisualExperiment/${lotteryNumber}/mobile`
      );

      const { text, status } = response;

      expect(status).toBe(200);
      expect(text).toBe('groupOne');
    }
  );

  test.each([[35], [68], [505]])(
    'lottery number %i should return groupTwo when it is between 35 and 68 or is 505 and device is mobile for TopStoriesVisualExperiment',
    async (lotteryNumber: number) => {
      const response: supertest.Response = await supertest(app).get(
        `${experimentApi}/TopStoriesVisualExperiment/${lotteryNumber}/mobile`
      );

      const { text, status } = response;

      expect(status).toBe(200);
      expect(text).toBe('groupTwo');
    }
  );

  it('should return control when device is not mobile for TopStoriesVisualExperiment', async () => {
    const response: supertest.Response = await supertest(app).get(
      `${experimentApi}/TopStoriesVisualExperiment/404/tablet`
    );

    const { text, status } = response;

    expect(status).toBe(200);
    expect(text).toBe('control');
  });

  it('should return control when lottery number is between 69 to 100 and is not 404 or 505 for TopStoriesVisualExperiment', async () => {
    const response: supertest.Response = await supertest(app).get(
      `${experimentApi}/TopStoriesVisualExperiment/69/mobile`
    );

    const { text, status } = response;

    expect(status).toBe(200);
    expect(text).toBe('control');
  });
});
