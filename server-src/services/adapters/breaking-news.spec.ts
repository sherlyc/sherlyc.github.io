import getBreakingNews from './breaking-news';
import axios from 'axios';

jest.mock('axios');

describe('Breaking news service', () => {
  it('should get a breaking news', async () => {
    const breakingNews = {
      enabled: true,
      id: 'whatever',
      text: 'breaking_news_text',
      link: 'http://example.com'
    };
    (axios.get as jest.Mock).mockResolvedValue({
      data: breakingNews
    });
    expect(await getBreakingNews()).toEqual(breakingNews);
  });

  it('should not get a breaking news when content-api request fails', async () => {
    const error = new Error('AJAX error');
    (axios.get as jest.Mock).mockRejectedValue(error);
    await expect(getBreakingNews()).rejects.toEqual(error);
  });
});
