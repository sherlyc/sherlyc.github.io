import cacheHttp from '../../utils/cache-http';
import config from '../../utils/config';
import { IRawArticle } from '../__types__/IRawArticle';
import { getArticleById } from '../jsonfeed';
import { getRecommendedArticles } from './recommendations.service';

const { url, limit } = config.recommendationsApi;

jest.mock('../../utils/cache-http');
jest.mock('../jsonfeed');

describe('getRecommendedArticles', () => {
  beforeEach(() => {
    (cacheHttp as jest.Mock).mockReturnValue({
      get: jest.fn()
    });
  });

  it('should get recommended articles from recommended API', async () => {
    (cacheHttp as jest.Mock).mockResolvedValue({
      status: 200,
      data: [1]
    });
    const mockArticle = {
      id: '1',
      indexHeadline: 'a',
      introText: 'a',
      linkUrl: 'asdf',
      defconSrc: 'asdf',
      imageSrc: 'asdf',
      strapImageSrc: 'asdf',
      imageSrcSet: 'asdf',
      strapImageSrcSet: 'asdf',
      lastPublishedTime: 34567,
      headlineFlags: []
    } as IRawArticle;
    (getArticleById as jest.Mock).mockResolvedValueOnce(mockArticle);

    const spadeParams = { apiRequestId: '123123' };
    const response = await getRecommendedArticles(
      'rt=nanz;enth=amuh',
      spadeParams
    );
    expect(cacheHttp).toHaveBeenCalledWith(
      spadeParams,
      `${url}?segment=rt%3Dnanz%3Benth%3Damuh&limit=${limit}`
    );
    expect(response).toEqual([mockArticle]);
  });
});
