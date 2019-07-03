import { IParams } from '../__types__/IParams';
import http from '../utils/http';
import config from '../utils/config';
import { layoutRetriever } from './layout-retriever';
import { LayoutType } from './__types__/LayoutType';

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

  it('should return defcon when layout retrieved is defcon', async () => {
    const layoutInfo = {
      layout: '/TopLeftArea/esi_parsys/ESIParsys/defcon_top_stories/lists/list1'
    };
    (http(params).get as jest.Mock).mockResolvedValue({
      status: 200,
      data: layoutInfo
    });

    expect(await layoutRetriever(params)).toEqual(LayoutType.DEFCON);
  });

  it('should return default when layout retrieved is portrait', async () => {
    const layoutInfo = {
      layout: '/TopLeftArea/esi_parsys/ESIParsys/portrait/something'
    };
    (http(params).get as jest.Mock).mockResolvedValue({
      status: 200,
      data: layoutInfo
    });

    expect(await layoutRetriever(params)).toEqual(LayoutType.DEFAULT);
  });

  it('should throw error when the request is unsuccessful', async () => {
    (http(params).get as jest.Mock).mockResolvedValue({ status: 500 });

    await expect(layoutRetriever(params)).rejects.toEqual(
      new Error('Failed to fetch layout')
    );
  });
});
