import basicArticleListHandler from './basic-article-list';
import { Section } from '../section';
import * as rawArticleList from './__fixtures__/raw-article-list.json';
import * as basicArticleListHandlerOutput from './__fixtures__/basic-article-list-handler-output.json';
import { getArticleList } from '../adapters/jsonfeed';
import { IParams } from '../__types__/IParams';
import { HandlerInputType } from './__types__/HandlerInputType';

jest.mock('../adapters/jsonfeed');

describe('BasicArticleListHandler', () => {
  const params: IParams = { apiRequestId: 'request-id-for-testing' };
  beforeEach(() => {
    jest.resetModules();
  });

  it('should get a list of basic article units and ad units', async () => {
    const sectionId = Section.Business;
    const totalArticles = 1;
    const totalAdUnits = 2;
    (getArticleList as jest.Mock).mockResolvedValue(rawArticleList);

    const handlerRunnerMock = jest.fn();

    const contentBlocks = await basicArticleListHandler(
      handlerRunnerMock,
      {
        type: HandlerInputType.ArticleList,
        sectionId,
        totalArticles
      },
      params
    );

    expect(contentBlocks.length).toBe(totalArticles + totalAdUnits);
    expect(contentBlocks).toEqual(
      basicArticleListHandlerOutput.OneArticleTwoAd
    );
  });

  it('should get a list of basic article units and ad units not exceeding the maximum length', async () => {
    const sectionId = Section.Business;
    const totalArticles = 2;
    const totalAdUnits = 3;
    (getArticleList as jest.Mock).mockResolvedValue(rawArticleList);

    const handlerRunnerMock = jest.fn();

    const contentBlocks = await basicArticleListHandler(
      handlerRunnerMock,
      {
        type: HandlerInputType.ArticleList,
        sectionId,
        totalArticles
      },
      params
    );

    expect(contentBlocks.length).toBe(totalArticles + totalAdUnits);
    expect(contentBlocks).toEqual(
      basicArticleListHandlerOutput.TwoArticleThreeAd
    );
  });
});
