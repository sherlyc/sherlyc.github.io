import { getRecommendedArticles } from './recommendations.service';
import cacheHttp from '../../utils/cache-http';
import config from '../../utils/config';

const { url, limit } = config.recommendationsApi;

jest.mock('../../utils/cache-http');

describe('getRecommendedArticles', () => {
  it('should get recommended articles from recommended API', async () => {
    const mockIdList = [123, 456, 789];
    (cacheHttp as jest.Mock).mockResolvedValueOnce({
      status: 200,
      data: mockIdList
    });

    const spadeParams = { apiRequestId: '123123' };
    const response = await getRecommendedArticles(
      'rt=nanz;enth=amuh',
      spadeParams
    );
    expect(cacheHttp).toHaveBeenCalledWith(
      spadeParams,
      `${url}?segment=rt%3Dnanz%3Benth%3Damuh&limit=${limit}`
    );
    expect(response).toEqual(mockIdList);
  });
});
