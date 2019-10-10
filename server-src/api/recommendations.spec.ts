import { getHomePageRecommendations } from './recommendations';
import { Request } from 'express';
import cacheHttp from '../services/utils/cache-http';
import config from '../services/utils/config';

jest.mock('../services/utils/cache-http');

describe('Recommendations', () => {
  const res = {
    json: jest.fn(),
    sendStatus: jest.fn(),
    end: jest.fn()
  } as any;

  it('should get recommended articles from recommendations api', async () => {
    const req = {
      spadeParams: { apiRequestId: '123123' },
      cookies: {}
    } as Request;

    await getHomePageRecommendations(req, res);

    expect(cacheHttp).toHaveBeenCalledWith(
      req.spadeParams,
      config.recommendationsApi
    );
  });
});
