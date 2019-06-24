import { getArticleList, getListAsset } from './jsonfeed';
import http from '../utils/http';
import * as jsonfeed from './__fixtures__/jsonfeed/jsonfeed.json';
import * as midStripData from './__fixtures__/mid-strip/mid-strip.json';
import * as miniMidStripData from './__fixtures__/mini-mid-strip/mini-mid-strip.json';
import * as editorsPickData from './__fixtures__/editors-pick/editors-pick.json';
import * as dailyFixData from './__fixtures__/daily-fix/daily-fix.json';
import { Section } from '../section';
import { IParams } from '../__types__/IParams';
import { ListAsset } from '../listAsset';
import { IRawArticle } from './__types__/IRawArticle';

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

      const articles = await getArticleList(Section.Latest, 2, params);

      verifyArticles(articles);
    });
  });

  describe('mid strip service', () => {
    it('should provide mid strip data', async () => {
      (http(params).get as jest.Mock).mockResolvedValue({ data: midStripData });

      const midStripArticles = await getListAsset(
        params,
        ListAsset.MidStrip,
        2
      );

      verifyArticles(midStripArticles);
    });
  });

  describe('mini mid strip service', () => {
    it('should provide mini mid strip data', async () => {
      (http(params).get as jest.Mock).mockResolvedValue({
        data: miniMidStripData.threeListAssets
      });

      const miniMidStripArticles = await getListAsset(
        params,
        ListAsset.MiniMidStrip,
        2
      );

      verifyArticles(miniMidStripArticles);
    });
  });

  describe('editors pick service', () => {
    it('should provide editors pick service data', async () => {
      (http(params).get as jest.Mock).mockResolvedValue({
        data: editorsPickData
      });

      const editorPicks = await getListAsset(params, ListAsset.EditorPicks);

      verifyArticles(editorPicks);
    });
  });

  describe('daily fix service', () => {
    it('should provide daily fix service data', async () => {
      (http(params).get as jest.Mock).mockResolvedValue({
        data: dailyFixData
      });

      const dailyFixArticles = await getListAsset(params, ListAsset.DailyFix);

      verifyArticles(dailyFixArticles);
    });
  });
});

function verifyArticles(articles: IRawArticle[]) {
  articles.forEach((article) => {
    expect(article.id).toBeTruthy();
    expect(article.indexHeadline).toBeTruthy();
    expect(article.introText).toBeTruthy();
    expect(article.linkUrl).toBeTruthy();
    expect(article.imageSrc).toBeTruthy();
    expect(article.imageSrcSet).toBeTruthy();
    expect(article.lastPublishedTime).toBeTruthy();
    expect(article.headlineFlags).toBeTruthy();
  });
}
