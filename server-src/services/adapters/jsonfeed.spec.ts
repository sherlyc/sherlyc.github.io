import { getSectionArticleList, getListAssetById, getArticleById } from './jsonfeed';
import http from '../utils/http';
import * as jsonfeed from './__fixtures__/jsonfeed/jsonfeed.json';
import * as midStripData from './__fixtures__/mid-strip/mid-strip.json';
import { Section } from '../section';
import { IParams } from '../__types__/IParams';
import { IRawArticle } from './__types__/IRawArticle';
import { JsonFeedAssetType } from './__types__/JsonFeedAssetType';
import { IJsonFeedArticle } from './__types__/IJsonFeedArticle';

jest.mock('./jsonfeed-retriever');

describe('json feed service', () => {

  afterEach(() => {
    jest.resetAllMocks();
  });

  const params: IParams = { apiRequestId: 'request-id-for-testing' };

  it('should provide a raw article list given a json feed section', async () => {
    const { retrieveSectionList } = require('./jsonfeed-retriever');
    (retrieveSectionList as jest.Mock).mockResolvedValue(jsonfeed);

    const articles = await getSectionArticleList(Section.Latest, 2, params);

    verifyArticles(articles);
  });

  it('should provide list asset data given the json feed list id', async () => {
    const { retrieveListAsset } = require('./jsonfeed-retriever');
    (retrieveListAsset as jest.Mock).mockResolvedValue(midStripData);

    const midStripArticles = await getListAssetById(params, '8438437', 2);

    verifyArticles(midStripArticles);
  });

  it('should get article and map it to raw article', async () => {
    const jsonFeedArticle = {
      id: 1,
      asset_type: JsonFeedAssetType.ARTICLE,
      headline_flags: [],
      sponsored: false,
      path: '/link',
      title: 'Article Title',
      alt_headline: 'Alt headline',
      isHeadlineOverrideApplied: true,
      datetime_iso8601: '123235345',
      alt_intro: 'Hello'
    } as IJsonFeedArticle;
    const { retrieveArticle } = require('./jsonfeed-retriever');
    (retrieveArticle as jest.Mock).mockResolvedValue(jsonFeedArticle);

    const article = await getArticleById(params, '1234');
    verifyArticles([article]);
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
