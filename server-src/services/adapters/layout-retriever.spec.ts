import { IParams } from '../__types__/IParams';
import http from '../utils/http';
import logger from '../utils/logger';
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
      section: '/content/desktop/stuff/jcr:content',
      title: null,
      layouts: [
        {
          layout:
            '/TopLeftArea/esi_parsys/ESIParsys/defcon_top_stories/lists/list1',
          asset_type: 'LIST',
          asset_id: 63768623
        },
        {
          layout:
            '/TopLeftArea/two_column_container/RightColumnParsys/title_headlines/lists/list1',
          asset_type: 'LIST',
          asset_id: 63868237
        }
      ]
    };
    (http(params).get as jest.Mock).mockResolvedValue({
      status: 200,
      data: layoutInfo
    });

    expect(await layoutRetriever(params)).toEqual(LayoutType.DEFCON);
  });

  it('should return default when layout retrieved is portrait', async () => {
    const layoutInfo = {
      section: '/content/desktop/stuff/jcr:content',
      title: null,
      layouts: [
        {
          layout:
            '/TopLeftArea/esi_parsys/ESIParsys/portrait_top_stories/lists/list1',
          asset_type: 'LIST',
          asset_id: 63768623
        },
        {
          layout:
            '/TopLeftArea/two_column_container/RightColumnParsys/title_headlines/lists/list1',
          asset_type: 'LIST',
          asset_id: 63868237
        }
      ]
    };
    (http(params).get as jest.Mock).mockResolvedValue({
      status: 200,
      data: layoutInfo
    });

    expect(await layoutRetriever(params)).toEqual(LayoutType.DEFAULT);
  });

  it('should return big headline when layout retrieved is big headline', async () => {
    const layoutInfo = {
      section: '/content/desktop/stuff/jcr:content',
      title: null,
      layouts: [
        {
          layout:
            '/TopLeftArea/esi_parsys/ESIParsys/big_headline_top_sto/lists/list1',
          asset_type: 'LIST',
          asset_id: 63768623
        },
        {
          layout:
            '/TopLeftArea/two_column_container/RightColumnParsys/title_headlines/lists/list1',
          asset_type: 'LIST',
          asset_id: 63868237
        }
      ]
    };
    (http(params).get as jest.Mock).mockResolvedValue({
      status: 200,
      data: layoutInfo
    });

    expect(await layoutRetriever(params)).toEqual(LayoutType.BIG_HEADLINE);
  });

  it('should log error and return default layout when the request is unsuccessful', async () => {
    (http(params).get as jest.Mock).mockResolvedValue({ status: 500 });
    const loggerSpy = jest.spyOn(logger, 'error');

    const layout = await layoutRetriever(params);

    expect(loggerSpy).toHaveBeenCalled();
    expect(layout).toBe(LayoutType.DEFAULT);
  });

  it('should log error and return default layout when the request does not contain top stories layout', async () => {
    const layoutInfo = {
      section: '/content/desktop/stuff/jcr:content',
      title: null,
      layouts: []
    };
    (http(params).get as jest.Mock).mockResolvedValue({
      status: 200,
      data: layoutInfo
    });
    const loggerSpy = jest.spyOn(logger, 'error');

    const layout = await layoutRetriever(params);

    expect(loggerSpy).toHaveBeenCalled();
    expect(layout).toBe(LayoutType.DEFAULT);
  });
});
