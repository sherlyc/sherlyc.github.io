import { IParams } from '../__types__/IParams';
import http from '../utils/http';
import config from '../utils/config';
import { layoutRetriever } from './layout-retriever';

jest.mock('../utils/config');
jest.mock('../utils/http');

beforeAll(() => {
  (http as jest.Mock).mockReturnValue({
    get: jest.fn(),
    post: jest.fn()
  });
});

describe('layout retriever', () => {
  const params: IParams = { apiRequestId: 'request-id-for-testing' };

  it('should get layout info when request is successful', async () => {
    const layoutInfo = {
      layout: '/TopLeftArea/esi_parsys/ESIParsys/defcon_top_stories/lists/list1'
    };
    (http(params).get as jest.Mock).mockResolvedValue({
      status: 200,
      data: layoutInfo
    });

    expect(await layoutRetriever(params)).toEqual(layoutInfo);
  });

  it('should throw error when the request is unsuccessful', async () => {
    (http(params).get as jest.Mock).mockResolvedValue({ status: 500 });

    await expect(layoutRetriever(params)).rejects.toEqual(
      new Error('Failed to fetch layout')
    );
  });
});
