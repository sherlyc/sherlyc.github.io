import { getSectionArticleList, getListAssetById } from './jsonfeed';
import http from '../utils/http';
import * as jsonfeed from './__fixtures__/jsonfeed/jsonfeed.json';
import * as midStripData from './__fixtures__/mid-strip/mid-strip.json';
import { Section } from '../section';
import { IParams } from '../__types__/IParams';
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

  it('should provide a raw article list given a json feed section', async () => {
    (http(params).get as jest.Mock).mockResolvedValue({ data: jsonfeed });

    const articles = await getSectionArticleList(Section.Latest, 2, params);

    verifyArticles(articles);
  });

  it('should provide list asset data given the json feed list id', async () => {
    (http(params).get as jest.Mock).mockResolvedValue({ data: midStripData });

    const midStripArticles = await getListAssetById(params, '8438437', 2);

    verifyArticles(midStripArticles);
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
