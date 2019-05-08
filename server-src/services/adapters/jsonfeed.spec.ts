import { getMidStrip, getArticleList } from './jsonfeed';
import * as rawArticleList from './__fixtures__/raw-article-list.json';
import * as rawMidStrip from './__fixtures__/raw-mid-strip.json';
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

      expect(await getArticleList(Section.Latest, 2, params)).toEqual(
        rawArticleList
      );
    });
  });

  describe('mid strip service', () => {
    it('should provide mid strip data', async () => {
      (http(params).get as jest.Mock).mockResolvedValue({ data: midStripData });

      expect(await getMidStrip(2, params)).toEqual(rawMidStrip);
    });
  });
});
