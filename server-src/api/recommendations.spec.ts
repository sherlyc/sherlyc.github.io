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

  beforeAll(() => {
    (cacheHttp as jest.Mock).mockReturnValue({
      get: jest.fn
    });
  });

  it('should get recommended articles from recommendations api', async () => {
    const req = {
      spadeParams: { apiRequestId: '123123' },
      cookies: {
        [config.recommendationsCookie]:
          'geo=akl;geo=aklr;rt=nanz;enth=amuh;rt=nbnsu;rt=tsv'
      }
    } as Request;

    (cacheHttp as jest.Mock).mockResolvedValueOnce({
      status: 200,
      data: [123, 456, 789]
    });

    await getHomePageRecommendations(req, res);

    expect(cacheHttp).toHaveBeenCalledWith(
      req.spadeParams,
      `${config.recommendationsApi}?segment=rt%3Dnanz%3Benth%3Damuh%3Brt%3Dnbnsu&limit=5`
    );
  });
});
