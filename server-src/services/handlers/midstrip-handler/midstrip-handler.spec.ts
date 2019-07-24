import midstripHandler from './midstrip-handler';
import { getListAsset } from '../../adapters/jsonfeed';
import { IColumnContainer } from 'common/__types__/IColumnContainer';
import { IParams } from '../../__types__/IParams';
import { HandlerInputType } from '../__types__/HandlerInputType';

jest.mock('../../adapters/jsonfeed');

describe('MidStripHandler', () => {
  const params: IParams = { apiRequestId: 'request-id-for-testing' };
  const rawMidStrip = [
    {
      id: '1',
      indexHeadline: 'Headline 1',
      introText: 'Intro 1',
      linkUrl: '/link1',
      imageSrc: '1.jpg',
      imageSrcSet: '1.jpg 1w',
      lastPublishedTime: 1,
      headlineFlags: []
    },
    {
      id: '2',
      indexHeadline: 'Headline 2',
      introText: 'Intro 2',
      linkUrl: '/link2',
      imageSrc: '2.jpg',
      imageSrcSet: '2.jpg 2w',
      lastPublishedTime: 2,
      headlineFlags: []
    }
  ];
  beforeEach(() => {
    jest.resetModules();
  });

  it('should get a list of Image Links', async () => {
    const totalArticles = 2;

    (getListAsset as jest.Mock).mockResolvedValue(rawMidStrip);

    const handlerRunnerMock = jest.fn();

    const columnContainer = (await midstripHandler(
      handlerRunnerMock,
      {
        type: HandlerInputType.MidStrip,
        strapName: 'MidStrip',
        totalArticles
      },
      params
    )) as IColumnContainer[];

    const imageLinkUnits = columnContainer[0].items;

    expect(imageLinkUnits.length).toBe(totalArticles);
    expect(columnContainer).toEqual([
      {
        type: 'ColumnContainer',
        items: [
          {
            headlineFlags: [],
            id: '1',
            strapName: 'MidStrip',
            imageSrc: '1.jpg',
            imageSrcSet: '1.jpg 1w',
            indexHeadline: 'Headline 1',
            linkUrl: '/link1',
            type: 'ImageLinkUnit'
          },
          {
            headlineFlags: [],
            id: '2',
            strapName: 'MidStrip',
            imageSrc: '2.jpg',
            imageSrcSet: '2.jpg 2w',
            indexHeadline: 'Headline 2',
            linkUrl: '/link2',
            type: 'ImageLinkUnit'
          }
        ]
      },
      { type: 'BasicAdUnit' }
    ]);
  });

  it('should get a list of Image links not exceeding number of requested item', async () => {
    const totalArticles = 1;
    (getListAsset as jest.Mock).mockResolvedValue(rawMidStrip);

    const handlerRunnerMock = jest.fn();

    const columnContainer = (await midstripHandler(
      handlerRunnerMock,
      {
        type: HandlerInputType.MidStrip,
        strapName: 'MidStrip',
        totalArticles
      },
      params
    )) as IColumnContainer[];

    const imageLinkUnits = columnContainer[0].items;

    expect(imageLinkUnits.length).toBe(totalArticles);
    expect(columnContainer).toEqual([
      {
        type: 'ColumnContainer',
        items: [
          {
            headlineFlags: [],
            id: '1',
            strapName: 'MidStrip',
            imageSrc: '1.jpg',
            imageSrcSet: '1.jpg 1w',
            indexHeadline: 'Headline 1',
            linkUrl: '/link1',
            type: 'ImageLinkUnit'
          }
        ]
      },
      { type: 'BasicAdUnit' }
    ]);
  });

  it('should throw error when failing to retrieve articles', async () => {
    const error = new Error('failed to retrieve');
    (getListAsset as jest.Mock).mockRejectedValue(error);

    await expect(
      midstripHandler(
        jest.fn(),
        {
          type: HandlerInputType.MidStrip,
          strapName: 'MidStrip',
          totalArticles: 2
        },
        params
      )
    ).rejects.toEqual(error);
  });
});
