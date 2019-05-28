import {
  retrieveMidStrip,
  retrieveArticleList,
  retrieveMiniMidStrip,
  retrieveEditorsPick
} from './jsonfeed-retriever';
import * as jsonfeed from './__fixtures__/jsonfeed.json';
import * as midStripData from './__fixtures__/mid-strip.json';
import * as miniMidStripData from './__fixtures__/mini-mid-strip.json';
import * as editorsPickData from './__fixtures__/editors-pick.json';
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

      expect(await retrieveMidStrip(params, 2)).toEqual(midStripData);
    });

    it('should throw error when jsonfeed request for mid strip fails', async () => {
      const error = new Error('AJAX error');
      (http(params).get as jest.Mock).mockRejectedValue(error);

      await expect(retrieveMidStrip(params, 2)).rejects.toEqual(error);
    });

    it('should retrieve specified number of articles', async () => {
      (http(params).get as jest.Mock).mockResolvedValue({ data: midStripData });

      const midStripJsonFeed = await retrieveMidStrip(params, 1);

      const articles = midStripJsonFeed.assets;
      expect(articles.length).toEqual(1);
    });

    it('should retrieve all articles if specifed total is more than number of articles received', async () => {
      (http(params).get as jest.Mock).mockResolvedValue({ data: midStripData });

      const midStripJsonFeed = await retrieveMidStrip(params, 5);

      const articles = midStripJsonFeed.assets;
      expect(articles.length).toEqual(2);
    });
  });

  describe('Mini midstrip', () => {
    it('should respond with mid strip data', async () => {
      (http(params).get as jest.Mock).mockResolvedValue({
        data: miniMidStripData.threeListAssets
      });

      expect(await retrieveMiniMidStrip(params, 2)).toEqual(
        miniMidStripData.twoListAssets
      );
    });

    it('should throw error when jsonfeed request for mini mid strip fails', async () => {
      const error = new Error('AJAX error');
      (http(params).get as jest.Mock).mockRejectedValue(error);

      await expect(retrieveMiniMidStrip(params, 2)).rejects.toEqual(error);
    });
  });

  describe('Editors pick', () => {
    it('should response with editors pick data', async () => {
      (http(params).get as jest.Mock).mockResolvedValue({
        data: editorsPickData
      });

      expect(await retrieveEditorsPick(params, 8)).toEqual(editorsPickData);
    });

    it('should throw error when jsonfeed request for editors pick fails', async () => {
      const error = new Error('AJAX error');
      (http(params).get as jest.Mock).mockRejectedValue(error);

      await expect(retrieveEditorsPick(params, 8)).rejects.toEqual(error);
    });

    it('should return only 8 editors pick article', async () => {
      const tenArticles = Array(10).fill(editorsPickData.assets[0]);
      (http(params).get as jest.Mock).mockResolvedValue({
        data: { ...editorsPickData, assets: tenArticles }
      });

      const editorsPick = await retrieveEditorsPick(params, 8);
      expect(editorsPick.assets.length).toEqual(8);
    });
  });
});
