import basicArticleListHandler from './basic-article-list';
import { Section } from '../section';
import * as rawArticleList from './__fixtures__/raw-article-list.json';
import * as basicArticleListHandlerOutput from './__fixtures__/basic-article-list-handler-output.json';
import jsonfeed from '../adapters/jsonfeed';

jest.mock('../adapters/jsonfeed');

describe('BasicArticleListHandler', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('should get a list of basic article units and ad units', async () => {
    const sectionId = Section.Business;
    const totalArticles = 1;
    const totalAdUnits = 2;
    (jsonfeed as jest.Mock).mockResolvedValue(rawArticleList);

    const handlerRunnerMock = jest.fn();

    const contentBlocks = await basicArticleListHandler(handlerRunnerMock, {
      type: 'ArticleList',
      sectionId,
      totalArticles
    });

    expect(contentBlocks.length).toBe(totalArticles + totalAdUnits);
    expect(contentBlocks).toEqual(
      basicArticleListHandlerOutput.OneArticleTwoAd
    );
  });

  it('should get a list of basic article units and ad units not exceeding the maximum length', async () => {
    const sectionId = Section.Business;
    const totalArticles = 2;
    const totalAdUnits = 3;
    (jsonfeed as jest.Mock).mockResolvedValue(rawArticleList);

    const handlerRunnerMock = jest.fn();

    const contentBlocks = await basicArticleListHandler(handlerRunnerMock, {
      type: 'ArticleList',
      sectionId,
      totalArticles
    });

    expect(contentBlocks.length).toBe(totalArticles + totalAdUnits);
    expect(contentBlocks).toEqual(
      basicArticleListHandlerOutput.TwoArticleThreeAd
    );
  });
});
