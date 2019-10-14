import { getHomePageRecommendations } from './recommendations';
import { Request } from 'express';
import cacheHttp from '../services/utils/cache-http';
import config from '../services/utils/config';

const { url, limit } = config.recommendationsApi;

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
      params: {
        segments: 'rt=nanz;enth=amuh'
      }
    } as any;

    (cacheHttp as jest.Mock).mockResolvedValueOnce({
      status: 200,
      data: [123, 456, 789]
    });

    await getHomePageRecommendations(req, res);

    expect(cacheHttp).toHaveBeenCalledWith(
      req.spadeParams,
      `${url}?segment=rt%3Dnanz%3Benth%3Damuh&limit=${limit}`
    );
  });
});
