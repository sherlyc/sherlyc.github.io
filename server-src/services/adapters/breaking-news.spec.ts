import getBreakingNews from './breaking-news';
import http from '../utils/http';
import config from '../utils/config';

jest.mock('../utils/http');
jest.mock('../utils/config');

describe('Breaking news service', () => {
  it('should get a breaking news', async () => {
    const breakingNews = {
      enabled: true,
      id: 'whatever',
      text: 'breaking_news_text',
      link: 'http://example.com'
    };
    (http.get as jest.Mock).mockResolvedValue({
      data: breakingNews
    });

    config.contentAPI =
      'http://content-api-gateway-staging.fairfaxmedia.co.nz/service/content/v1';
    expect(await getBreakingNews()).toEqual(breakingNews);
  });

  it('should not get a breaking news when content-api request fails', async () => {
    const error = new Error('AJAX error');
    (http.get as jest.Mock).mockRejectedValue(error);
    await expect(getBreakingNews()).rejects.toEqual(error);
  });

  it('should return mocked contentAPI when contentAPI value is MOCKED', async () => {
    config.contentAPI = 'MOCKED';
    expect(await getBreakingNews()).toEqual({
      id: '123',
      text: 'Buyer made $700k overnight',
      link:
        'https://www.stuff.co.nz/business/111688527/vendors-claim-real-estate-agent-acted-inappropriately-in-helping-buyer-flip-house',
      enabled: true
    });
  });
});
