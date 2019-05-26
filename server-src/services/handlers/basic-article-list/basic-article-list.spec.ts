import basicArticleListHandler from './basic-article-list';
import { Section } from '../../section';
import * as rawArticleList from '../__fixtures__/raw-article-list.json';
import * as rawEditorsPick from '../../adapters/__fixtures__/raw-editors-pick.json';
import * as longEditorsPick from '../__fixtures__/raw-editors-pick.json';
import * as handlerOutputForSection from '../__fixtures__/basic-article-list-handler-output-for-section.json';
import * as handlerOutputForListAsset from '../__fixtures__/basic-article-list-handler-output-for-listasset.json';
import { getArticleList, getListAsset } from '../../adapters/jsonfeed';
import { IParams } from '../../__types__/IParams';
import { HandlerInputType } from '../__types__/HandlerInputType';
import { ListAsset } from '../../listAsset';

jest.mock('../../adapters/jsonfeed');

describe('BasicArticleListHandler', () => {
  const params: IParams = { apiRequestId: 'request-id-for-testing' };
  beforeEach(() => {
    jest.resetModules();
  });

  it('should get a list of basic article units and ad units', async () => {
    const totalArticles = 1;
    const totalAdUnits = 2;
    (getArticleList as jest.Mock).mockResolvedValue(rawArticleList);

    const handlerRunnerMock = jest.fn();

    const contentBlocks = await basicArticleListHandler(
      handlerRunnerMock,
      {
        type: HandlerInputType.ArticleList,
        sourceId: Section.Business,
        totalBasicArticlesUnit: 1
      },
      params
    );

    expect(contentBlocks.length).toBe(totalArticles + totalAdUnits);
    expect(contentBlocks).toEqual(handlerOutputForSection.OneArticleUnitTwoAds);
  });

  it('should get a list of basic article units and ad units not exceeding the maximum length', async () => {
    const totalArticles = 2;
    const totalAdUnits = 3;
    (getArticleList as jest.Mock).mockResolvedValue(rawArticleList);

    const handlerRunnerMock = jest.fn();

    const contentBlocks = await basicArticleListHandler(
      handlerRunnerMock,
      {
        type: HandlerInputType.ArticleList,
        sourceId: Section.Business,
        totalBasicArticlesUnit: 2
      },
      params
    );

    expect(contentBlocks.length).toBe(totalArticles + totalAdUnits);
    expect(contentBlocks).toEqual(
      handlerOutputForSection.TwoArticleUnitsThreeAds
    );
  });

  it('should get a list of basic article units, basic article title units, and ad units', async () => {
    const totalBasicArticlesUnit = 1;
    const totalBasicArticleTitleUnit = 1;

    const totalAdUnits = 3;
    (getArticleList as jest.Mock).mockResolvedValue(rawArticleList);

    const handlerRunnerMock = jest.fn();

    const contentBlocks = await basicArticleListHandler(
      handlerRunnerMock,
      {
        type: HandlerInputType.ArticleList,
        sourceId: Section.Business,
        totalBasicArticlesUnit,
        totalBasicArticleTitleUnit
      },
      params
    );

    expect(contentBlocks.length).toBe(
      totalBasicArticlesUnit + totalBasicArticleTitleUnit + totalAdUnits
    );
    expect(contentBlocks).toEqual(
      handlerOutputForSection.OneArticleUnitOneArticleTitleThreeAds
    );
  });

  it('should get one basic article units and one basic article title unit', async () => {
    const totalArticles = 2;
    const totalAdUnits = 3;
    (getListAsset as jest.Mock).mockResolvedValue(rawEditorsPick);

    const contentBlocks = await basicArticleListHandler(
      jest.fn(),
      {
        type: HandlerInputType.ArticleList,
        totalBasicArticlesUnit: 1,
        totalBasicArticleTitleUnit: 1,
        sourceId: ListAsset.EditorPicks
      },
      params
    );

    expect(contentBlocks.length).toBe(totalArticles + totalAdUnits);
    expect(contentBlocks).toEqual(
      handlerOutputForListAsset.OneArticleUnitOneArticleTitleThreeAds
    );
  });

  it('should get multiple basic article units and multiple articles title units', async () => {
    const totalArticles = 4;
    const totalAdUnits = 5;
    (getListAsset as jest.Mock).mockResolvedValue(longEditorsPick);

    const contentBlocks = await basicArticleListHandler(
      jest.fn(),
      {
        type: HandlerInputType.ArticleList,
        totalBasicArticlesUnit: 2,
        totalBasicArticleTitleUnit: 2,
        sourceId: ListAsset.EditorPicks
      },
      params
    );

    expect(contentBlocks.length).toBe(totalArticles + totalAdUnits);
    expect(contentBlocks).toEqual(
      handlerOutputForListAsset.TwoArticleUnitsTwoArticleTitlesFiveAds
    );
  });
});
