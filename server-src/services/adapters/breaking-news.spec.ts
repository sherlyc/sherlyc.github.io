import getBreakingNews from './breaking-news';
import http from '../utils/http';
import config from '../utils/config';
import { IParams } from '../__types__/IParams';

jest.mock('../utils/config');
jest.mock('../utils/http');

describe('Breaking news service', () => {
  const params: IParams = { apiRequestId: 'request-id-for-testing' };

  beforeAll(() => {
    (http as jest.Mock).mockReturnValue({
      get: jest.fn(),
      post: jest.fn()
    });
  });

  it('should get a breaking news', async () => {
    const breakingNewsData = {
      enabled: true,
      id: 'whatever',
      text: 'breaking_news_text',
      link: 'http://example.com'
    };
    (http(params).get as jest.Mock).mockResolvedValue({
      data: { breakingNews: { breakingNewsData } }
    });

    config.breakingNewsApi =
      'http://content-api-gateway-staging.fairfaxmedia.co.nz/service/content/v1';
    expect(await getBreakingNews(params)).toEqual(breakingNewsData);
  });

  it('should not get a breaking news when content-api request fails', async () => {
    const error = new Error('AJAX error');
    (http(params).get as jest.Mock).mockRejectedValue(error);
    await expect(getBreakingNews(params)).rejects.toEqual(error);
  });
});
