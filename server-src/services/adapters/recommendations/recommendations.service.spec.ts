import { parseCookie, getRecommendedArticles } from './recommendations.service';
import cacheHttp from '../../utils/cache-http';
import config from '../../utils/config';

const { url, limit } = config.recommendationsApi;

jest.mock('../../utils/cache-http');

describe('Recommendations Service', () => {
  describe('parseCookie', () => {
    it.each`
      keys                   | maxCount | input                                                   | output
      ${['enth', 'rt', 'x']} | ${2}     | ${'geo=akl;geo=aklr;rt=nanz;enth=amuh;rt=nbnsu;rt=tsv'} | ${'rt=nanz;enth=amuh;rt=nbnsu'}
    `('works with $output', ({ keys, maxCount, input, output }) => {
      expect(parseCookie(keys, maxCount)(input)).toBe(output);
    });
  });

  describe('getRecommendedArticles', () => {
    it('should get recommended articles from recommended API', async () => {
      const mockIdList = [123, 456, 789];
      (cacheHttp as jest.Mock).mockResolvedValueOnce({
        status: 200,
        data: mockIdList
      });

      const spadeParams = { apiRequestId: '123123' };
      const response = await getRecommendedArticles(
        'geo=akl;geo=aklr;rt=nanz;enth=amuh;rt=nbnsu;rt=tsv',
        spadeParams
      );
      expect(cacheHttp).toHaveBeenCalledWith(
        spadeParams,
        `${url}?segment=rt%3Dnanz%3Benth%3Damuh%3Brt%3Dnbnsu&limit=${limit}`
      );
      expect(response).toEqual(mockIdList);
    });
  });
});
