import {
  retrieveMidStrip,
  retrieveArticleList,
  retrieveMiniMidStrip
} from './jsonfeed-retriever';
import * as jsonfeed from './__fixtures__/jsonfeed.json';
import * as midStripData from './__fixtures__/mid-strip.json';
import * as miniMidStripData from './__fixtures__/mini-mid-strip.json';
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

    it('should throw error when jsonfeed request for article list fails', async () => {
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

    it('should throw error when jsonfeed request for mid strip fails', async () => {
      const error = new Error('AJAX error');
      (http(params).get as jest.Mock).mockRejectedValue(error);

      await expect(retrieveMidStrip(2, params)).rejects.toEqual(error);
    });

    it('should retrieve specified number of articles', async () => {
      (http(params).get as jest.Mock).mockResolvedValue({ data: midStripData });

      const midStripJsonFeed = await retrieveMidStrip(1, params);

      const articles = midStripJsonFeed.assets;
      expect(articles.length).toEqual(1);
    });

    it('should retrieve all articles if specifed total is more than number of articles received', async () => {
      (http(params).get as jest.Mock).mockResolvedValue({ data: midStripData });

      const midStripJsonFeed = await retrieveMidStrip(5, params);

      const articles = midStripJsonFeed.assets;
      expect(articles.length).toEqual(2);
    });
  });

  describe('Mini midstrip', () => {
    it('should respond with mid strip data', async () => {
      (http(params).get as jest.Mock).mockResolvedValue({
        data: miniMidStripData
      });

      expect(await retrieveMiniMidStrip(params)).toEqual(miniMidStripData);
    });

    it('should throw error when jsonfeed request for mini mid strip fails', async () => {
      const error = new Error('AJAX error');
      (http(params).get as jest.Mock).mockRejectedValue(error);

      await expect(retrieveMiniMidStrip(params)).rejects.toEqual(error);
    });
  });
});
