import miniMidstripHandler from './mini-midstrip-handler';
import { getListAsset } from '../../adapters/jsonfeed';
import { IColumnContainer } from 'common/__types__/IColumnContainer';
import { IParams } from '../../__types__/IParams';
import { HandlerInputType } from '../__types__/HandlerInputType';
import { IRawArticle } from '../../adapters/__types__/IRawArticle';

jest.mock('../../adapters/jsonfeed');

describe('MiniMidStripHandler', () => {
  const params: IParams = { apiRequestId: 'request-id-for-testing' };
  beforeEach(() => {
    jest.resetModules();
  });
  const rawMiniMidStrip: IRawArticle[] = [
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

  it('should get a list of Image Links', async () => {
    (getListAsset as jest.Mock).mockResolvedValue(rawMiniMidStrip);

    const handlerRunnerMock = jest.fn();

    const columnContainer = (await miniMidstripHandler(
      handlerRunnerMock,
      {
        type: HandlerInputType.MiniMidStrip,
        strapName: 'MiniMidStrip',
        totalArticles: 2
      },
      params
    )) as IColumnContainer[];

    const imageLinkUnits = columnContainer[0].items;

    expect(imageLinkUnits.length).toBe(2);
    expect(columnContainer).toEqual([
      {
        type: 'ColumnContainer',
        items: [
          {
            id: '1',
            strapName: 'MiniMidStrip',
            headlineFlags: [],
            imageSrc: '1.jpg',
            imageSrcSet: '1.jpg 1w',
            indexHeadline: `Headline 1`,
            linkUrl: '/link1',
            type: 'ImageLinkUnit'
          },
          {
            id: '2',
            strapName: 'MiniMidStrip',
            headlineFlags: [],
            imageSrc: '2.jpg',
            imageSrcSet: '2.jpg 2w',
            indexHeadline: `Headline 2`,
            linkUrl: '/link2',
            type: 'ImageLinkUnit'
          }
        ]
      }
    ]);
  });
});
