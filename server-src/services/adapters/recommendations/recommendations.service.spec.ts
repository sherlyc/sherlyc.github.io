import cacheHttp from '../../utils/cache-http';
import config from '../../utils/config';
import { IRawArticle } from '../__types__/IRawArticle';
import { getArticleById } from '../jsonfeed';
import { getRecommendedArticles } from './recommendations.service';
import logger from '../../utils/logger';

const { url, limit } = config.recommendationsApi;

jest.mock('../../utils/cache-http');
jest.mock('../jsonfeed');
jest.mock('../../utils/logger');

describe('getRecommendedArticles', () => {
  const spadeParams = { apiRequestId: '123123' };
  const rawArticle = {
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

  beforeEach(() => {
    (cacheHttp as jest.Mock).mockReturnValue({
      get: jest.fn()
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should get recommended articles from recommended API', async () => {
    (cacheHttp as jest.Mock).mockResolvedValue({
      status: 200,
      data: [1]
    });
    (getArticleById as jest.Mock).mockResolvedValue(rawArticle);

    const articles = await getRecommendedArticles(
      'rt=nanz;enth=amuh',
      spadeParams
    );

    expect(cacheHttp).toHaveBeenCalledWith(
      spadeParams,
      `${url}?segment=rt%3Dnanz%3Benth%3Damuh&limit=${limit}`
    );
    expect(articles).toEqual([rawArticle]);
  });

  it('should log warning and return empty list of articles if recommendations API fails', async () => {
    (cacheHttp as jest.Mock).mockRejectedValueOnce(
      new Error('Internal Server Error')
    );

    const articles = await getRecommendedArticles('rt=nanz', spadeParams);

    expect(cacheHttp).toHaveBeenCalledWith(
      spadeParams,
      `${url}?segment=rt%3Dnanz&limit=${limit}`
    );
    expect(logger.warn).toHaveBeenCalled();
    expect(logger.warn).toHaveBeenCalledTimes(1);
    expect(articles).toEqual([]);
  });

  it('should log warning and return empty list if failing to retrieve articles', async () => {
    (cacheHttp as jest.Mock).mockResolvedValue({
      status: 200,
      data: [1, 2]
    });
    (getArticleById as jest.Mock).mockResolvedValue(rawArticle);
    (getArticleById as jest.Mock).mockRejectedValue(
      new Error('Failed to retrieve article')
    );

    const articles = await getRecommendedArticles('rt=nanz', spadeParams);

    expect(cacheHttp).toHaveBeenCalledWith(
      spadeParams,
      `${url}?segment=rt%3Dnanz&limit=${limit}`
    );
    expect(logger.warn).toHaveBeenCalled();
    expect(articles).toEqual([]);
  });
});
