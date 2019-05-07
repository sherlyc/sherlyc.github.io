import getRawArticleList, { getMidStrip } from './jsonfeed';
import * as rawArticleList from './__fixtures__/raw-article-list.json';
import http from '../utils/http';
import * as jsonfeed from './__fixtures__/jsonfeed.json';
import * as midStripData from './__fixtures__/mid-strip.json';
import { Section } from '../section';
import { IParams } from '../__types__/IParams';

jest.mock('../utils/http');

describe('json feed service', () => {
  beforeAll(() => {
    (http as jest.Mock).mockReturnValue({
      get: jest.fn(),
      post: jest.fn()
    });
  });
  const params: IParams = { apiRequestId: 'request-id-for-testing' };

  describe('raw article list service', () => {
    it('should provide a raw article list', async () => {
      (http(params).get as jest.Mock).mockResolvedValue({ data: jsonfeed });
      expect(await getRawArticleList(Section.Latest, 2, params)).toEqual(
        rawArticleList
      );
    });
  });

  describe('mid strip service', () => {
    it('should provide mid strip data', async () => {
      (http(params).get as jest.Mock).mockResolvedValue({ data: midStripData });
      const midStripResponse = [
        {
          id: '112545332',
          indexHeadline: '12 things Game of Thrones is doing wrong',
          introText:
            'Chiefly, Jon Snow, show some respect to your direwolf because he is a very good boy.',
          linkUrl:
            '/entertainment/tv-radio/112545332/the-12-things-that-are-really-bothering-us-on-game-of-thrones-right-now',
          imageSrc:
            'https://resources.stuff.co.nz/content/dam/images/1/u/u/m/1/e/image.related.StuffLandscapeThreeByTwo.300x200.1v08j8.png/1557261745697.jpg',
          lastPublishedTime: 1557261745,
          headlineFlags: []
        },
        {
          id: '112543273',
          indexHeadline: 'William: Welcome to sleep deprivation',
          introText:
            'Prince William has welcomed his younger brother Prince Harry to the "sleep deprivation society that is parenting".',
          linkUrl:
            '/life-style/parenting/pregnancy/birth/112543273/prince-william-to-prince-harry-welcome-to-the-sleep-deprivation-society-that-is-parenting',
          imageSrc:
            'https://resources.stuff.co.nz/content/dam/images/1/s/f/y/n/8/image.related.StuffLandscapeThreeByTwo.300x200.1v06y1.png/1557245795854.jpg',
          lastPublishedTime: 1557244223,
          headlineFlags: []
        }
      ];

      expect(await getMidStrip(2, params)).toEqual(midStripResponse);
    });
  });
});
