import getBanner from './banner';
import cacheHttp from '../utils/cache-http';
import { IParams } from '../__types__/IParams';

jest.mock('../utils/config');
jest.mock('../utils/cache-http');

describe('Banner service', () => {
  const params: IParams = { apiRequestId: 'request-id-for-testing' };

  beforeAll(() => {
    (cacheHttp as jest.Mock).mockReturnValue({
      get: jest.fn(),
      post: jest.fn()
    });
  });

  it('should get banner', async () => {
    const bannerData = {
      height: '50px',
      url: 'https://example.com/page.html'
    };
    (cacheHttp as jest.Mock).mockResolvedValue({
      data: bannerData
    });
    expect(await getBanner(params)).toEqual(bannerData);
  });

  it('should not get banner when api request fails', async () => {
    const error = new Error('AJAX error');
    (cacheHttp as jest.Mock).mockRejectedValue(error);
    await expect(getBanner(params)).rejects.toEqual(error);
  });
});
