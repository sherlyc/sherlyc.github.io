import miniMidstripHandler from './mini-midstrip-handler';
import { IColumnContainer } from 'common/__types__/IColumnContainer';
import { IParams } from '../../__types__/IParams';
import { HandlerInputType } from '../__types__/HandlerInputType';
import { IRawArticle } from '../../adapters/__types__/IRawArticle';
import { Strap } from '../../strap';
import { getStrapArticles } from '../../adapters/strap-list-service';
import { getListAsset } from '../../adapters/jsonfeed';
import { ListAsset } from '../../listAsset';

jest.mock('../../adapters/strap-list-service');
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
      defconSrc: null,
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
      defconSrc: null,
      imageSrc: '2.jpg',
      imageSrcSet: '2.jpg 2w',
      lastPublishedTime: 2,
      headlineFlags: []
    }
  ];

  describe('when source is strap', () => {
    it('should get a list of Image Links', async () => {
      (getStrapArticles as jest.Mock).mockResolvedValue(rawMiniMidStrip);

      const handlerRunnerMock = jest.fn();

      const columnContainer = (await miniMidstripHandler(
        handlerRunnerMock,
        {
          type: HandlerInputType.MiniMidStrip,
          sourceId: Strap.MiniMidStrip,
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
        },
        { type: 'BasicAdUnit' }
      ]);
    });

    it('should throw error when failing to retrieve articles', async () => {
      const error = new Error('failed to retrieve');
      (getStrapArticles as jest.Mock).mockRejectedValue(error);

      await expect(
        miniMidstripHandler(
          jest.fn(),
          {
            type: HandlerInputType.MiniMidStrip,
            sourceId: Strap.MiniMidStrip,
            strapName: 'MidStrip',
            totalArticles: 2
          },
          params
        )
      ).rejects.toEqual(error);
    });
  });

  describe('when source is a listasset', () => {
    it('should get a list of Image Links', async () => {
      (getListAsset as jest.Mock).mockResolvedValue(rawMiniMidStrip);

      const handlerRunnerMock = jest.fn();

      const columnContainer = (await miniMidstripHandler(
        handlerRunnerMock,
        {
          type: HandlerInputType.MiniMidStrip,
          sourceId: ListAsset.MiniMidStrip,
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
        },
        { type: 'BasicAdUnit' }
      ]);
    });

    it('should throw error when failing to retrieve articles', async () => {
      const error = new Error('failed to retrieve');
      (getListAsset as jest.Mock).mockRejectedValue(error);

      await expect(
        miniMidstripHandler(
          jest.fn(),
          {
            type: HandlerInputType.MiniMidStrip,
            sourceId: ListAsset.MiniMidStrip,
            strapName: 'MidStrip',
            totalArticles: 2
          },
          params
        )
      ).rejects.toEqual(error);
    });
  });
});
