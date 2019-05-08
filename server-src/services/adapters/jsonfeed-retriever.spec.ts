import { retrieveMidStrip, retrieveArticleList } from './jsonfeed-retriever';
import * as jsonfeed from './__fixtures__/jsonfeed.json';
import * as midStripData from './__fixtures__/mid-strip.json';
import http from '../utils/http';
import { Section } from '../section';
import { IParams } from '../__types__/IParams';

jest.mock('../utils/http');

describe('JsonFeed Retriever', () => {
  const params: IParams = { apiRequestId: 'request-id-for-testing' };

  beforeAll(() => {
    (http as jest.Mock).mockReturnValue({
      get: jest.fn(),
      post: jest.fn()
    });
  });

  describe('Article List', () => {
    it('should respond with the article list', async () => {
      (http(params).get as jest.Mock).mockResolvedValue({ data: jsonfeed });
      expect(await retrieveArticleList(Section.Latest, 6, params)).toEqual(
        jsonfeed
      );
    });

    it('should not retrieve the article list when jsonfeed request fails', async () => {
      const error = new Error('AJAX error');
      (http(params).get as jest.Mock).mockRejectedValue(error);
      await expect(
        retrieveArticleList(Section.Latest, 6, params)
      ).rejects.toEqual(error);
    });
  });

  describe('Midstrip', () => {
    it('should respond with mid strip data', async () => {
      (http(params).get as jest.Mock).mockResolvedValue({ data: midStripData });

      expect(await retrieveMidStrip(2, params)).toEqual(midStripData);
    });

    it('should not retrieve the mid strip when jsonfeed request fails', async () => {
      const error = new Error('AJAX error');
      (http(params).get as jest.Mock).mockRejectedValue(error);

      await expect(retrieveMidStrip(2, params)).rejects.toEqual(error);
    });

    it('should retrive specified number of articles', async () => {
      (http(params).get as jest.Mock).mockResolvedValue({ data: midStripData });

      const midStripJsonFeed = await retrieveMidStrip(1, params);

      expect(midStripJsonFeed.assets.length).toEqual(1);
    });

    it('should retrive all articles if specifed total is more than number of articles received', async () => {
      (http(params).get as jest.Mock).mockResolvedValue({ data: midStripData });

      const midStripJsonFeed = await retrieveMidStrip(5, params);

      expect(midStripJsonFeed.assets.length).toEqual(2);
    });
  });
});
