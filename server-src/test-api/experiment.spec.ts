import * as supertest from 'supertest';

describe('Experiment API', () => {
  const experimentApi = '/spade/api/experiment';
  const app = require('../app').default;

  it('should return 400 when experiment name is not recognized', async () => {
    const response: supertest.Response = await supertest(app).get(
      `${experimentApi}/Experiment/50`
    );
    const { status } = response;
    expect(status).toBe(400);
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

  test.each([[1], [34], [65], [100], [404]])(
    'should return groupOne variant for all numbers for TopStoriesVisualExperiment - lottery number %i',
    async (lotteryNumber: number) => {
      const response: supertest.Response = await supertest(app).get(
        `${experimentApi}/TopStoriesVisualExperiment/${lotteryNumber}/mobile`
      );

      const { text, status } = response;

      expect(status).toBe(200);
      expect(text).toBe('groupOne');
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
});
