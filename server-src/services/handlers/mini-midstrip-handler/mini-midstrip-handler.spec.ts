import miniMidstripHandler from './mini-midstrip-handler';
import * as rawMiniMidStrip from '../../adapters/__fixtures__/mini-mid-strip/raw-mini-mid-strip.json';
import { getListAsset } from '../../adapters/jsonfeed';
import { IColumnContainer } from 'common/__types__/IColumnContainer';
import { IParams } from '../../__types__/IParams';
import { HandlerInputType } from '../__types__/HandlerInputType';

jest.mock('../../adapters/jsonfeed');

describe('MiniMidStripHandler', () => {
  const params: IParams = { apiRequestId: 'request-id-for-testing' };
  beforeEach(() => {
    jest.resetModules();
  });

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
            id: '112556125',
            strapName: 'MiniMidStrip',
            headlineFlags: ['VIDEO'],
            imageSrc:
              'https://resources.stuff.co.nz/content/dam/images/1/v/0/i/9/z/image.related.StuffLandscapeThreeByTwo.300x200.1v0gv1.png/1557282443654.png',
            indexHeadline: "Barker's Am Cup capsize",
            linkUrl:
              '/sport/americas-cup/112556125/dean-barker-admits-to-hard-learnings-as-capsize-in-americas-cup-test-boat-revealed',
            type: 'ImageLinkUnit'
          },
          {
            id: '112561756',
            strapName: 'MiniMidStrip',
            headlineFlags: [],
            imageSrc:
              'https://resources.stuff.co.nz/content/dam/images/1/u/y/s/b/z/image.related.StuffLandscapeThreeByTwo.300x200.1v0l7g.png/1557286998808.jpg',
            indexHeadline: "Hipkins: Anti-vaxxers 'pro-plague'",
            linkUrl:
              '/national/politics/112561756/education-minister-chris-hipkins-says-antivaxxers-are-proplague',
            type: 'ImageLinkUnit'
          }
        ]
      }
    ]);
  });
});
