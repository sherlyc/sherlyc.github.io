import basicArticleListHandler from './basic-article-list';
import { IParams } from '../../__types__/IParams';
import { HandlerInputType } from '../__types__/HandlerInputType';
import { Strap } from '../../strap';
import { Section } from '../../section';
import { IBasicArticleUnit } from '../../../../common/__types__/IBasicArticleUnit';
import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';
import { IBasicArticleTitleUnit } from '../../../../common/__types__/IBasicArticleTitleUnit';
import { getRawArticles } from '../../adapters/article-retriever/article-retriever';
import logger from '../../utils/logger';

jest.mock('../../adapters/article-retriever/article-retriever');
jest.mock('../../utils/logger');

describe('BasicArticleListHandler', () => {
  const params: IParams = { apiRequestId: 'request-id-for-testing' };
  const strapName = 'Example strap name';

  const adUnitWithContext = {
    type: 'BasicAdUnit',
    context: strapName
  };

  const articleOne = {
    id: '1',
    indexHeadline: 'Headline 1',
    title: 'Title One',
    introText: 'Intro 1',
    linkUrl: '/link1',
    defconSrc: null,
    imageSrc: '1.jpg',
    imageSrcSet: '1.jpg 1w',
    strapImageSrc: 'strap1.jpg',
    strapImageSrcSet: 'strap1.jpg 1w',
    lastPublishedTime: 1,
    headlineFlags: []
  };

  const articleTwo = {
    id: '2',
    indexHeadline: 'Headline 2',
    title: 'Title Two',
    introText: 'Intro 2',
    linkUrl: '/link2',
    defconSrc: null,
    imageSrc: '2.jpg',
    imageSrcSet: '2.jpg 2w',
    strapImageSrc: 'strap2.jpg',
    strapImageSrcSet: 'strap2.jpg 1w',
    lastPublishedTime: 2,
    headlineFlags: []
  };

  const articleOneAsBasicArticle: IBasicArticleUnit = {
    type: ContentBlockType.BasicArticleUnit,
    id: '1',
    strapName,
    indexHeadline: 'Headline 1',
    title: 'Title One',
    introText: 'Intro 1',
    linkUrl: '/link1',
    imageSrc: '1.jpg',
    imageSrcSet: '1.jpg 1w',
    lastPublishedTime: 1,
    headlineFlags: []
  };

  const articleTwoAsBasicArticle: IBasicArticleUnit = {
    type: ContentBlockType.BasicArticleUnit,
    id: '2',
    strapName,
    indexHeadline: 'Headline 2',
    title: 'Title Two',
    introText: 'Intro 2',
    linkUrl: '/link2',
    imageSrc: '2.jpg',
    imageSrcSet: '2.jpg 2w',
    lastPublishedTime: 2,
    headlineFlags: []
  };

  const articleTwoAsBasicArticleTitle: IBasicArticleTitleUnit = {
    type: ContentBlockType.BasicArticleTitleUnit,
    id: '2',
    strapName,
    indexHeadline: 'Headline 2',
    title: 'Title Two',
    lastPublishedTime: 2,
    linkUrl: '/link2',
    headlineFlags: []
  };

  beforeEach(() => {
    jest.resetModules();
  });

  it('should get a list of basic article units and ad units', async () => {
    const expectedContentBlocks = [
      adUnitWithContext,
      articleOneAsBasicArticle,
      adUnitWithContext
    ];
    const rawArticles = [articleOne];
    (getRawArticles as jest.Mock).mockResolvedValue(rawArticles);

    const handlerRunnerMock = jest.fn();

    const contentBlocks = await basicArticleListHandler(
      handlerRunnerMock,
      {
        type: HandlerInputType.ArticleList,
        sourceId: Section.Business,
        strapName,
        totalBasicArticlesUnit: 1
      },
      params
    );

    expect(contentBlocks).toEqual(expectedContentBlocks);
  });

  it('should get a list of basic article units and ad units not exceeding the maximum length', async () => {
    const expectedContentBlocks = [
      adUnitWithContext,
      articleOneAsBasicArticle,
      adUnitWithContext,
      articleTwoAsBasicArticle,
      adUnitWithContext
    ];
    const rawArticles = [articleOne, articleTwo];
    (getRawArticles as jest.Mock).mockResolvedValue(rawArticles);

    const handlerRunnerMock = jest.fn();

    const contentBlocks = await basicArticleListHandler(
      handlerRunnerMock,
      {
        type: HandlerInputType.ArticleList,
        sourceId: Strap.Business,
        strapName,
        totalBasicArticlesUnit: 2
      },
      params
    );

    expect(contentBlocks).toEqual(expectedContentBlocks);
  });

  it('should get one basic article unit, one basic article title unit, and ad units', async () => {
    const expectContentBlocks = [
      adUnitWithContext,
      articleOneAsBasicArticle,
      adUnitWithContext,
      articleTwoAsBasicArticleTitle,
      adUnitWithContext
    ];
    const rawArticles = [articleOne, articleTwo];
    (getRawArticles as jest.Mock).mockResolvedValue(rawArticles);

    const handlerRunnerMock = jest.fn();

    const contentBlocks = await basicArticleListHandler(
      handlerRunnerMock,
      {
        type: HandlerInputType.ArticleList,
        sourceId: Strap.Business,
        strapName,
        totalBasicArticlesUnit: 1,
        totalBasicArticleTitleUnit: 1
      },
      params
    );

    expect(contentBlocks).toEqual(expectContentBlocks);
  });

  it('should get multiple basic article units and multiple articles title units', async () => {
    const expectedContentBlocks = [
      adUnitWithContext,
      articleTwoAsBasicArticle,
      adUnitWithContext,
      articleTwoAsBasicArticle,
      adUnitWithContext,
      articleTwoAsBasicArticleTitle,
      adUnitWithContext,
      articleTwoAsBasicArticleTitle,
      adUnitWithContext
    ];
    const rawArticles = [articleTwo, articleTwo, articleTwo, articleTwo];
    (getRawArticles as jest.Mock).mockResolvedValue(rawArticles);

    const contentBlocks = await basicArticleListHandler(
      jest.fn(),
      {
        type: HandlerInputType.ArticleList,
        sourceId: Strap.EditorPicks,
        strapName,
        totalBasicArticlesUnit: 2,
        totalBasicArticleTitleUnit: 2
      },
      params
    );

    expect(contentBlocks).toEqual(expectedContentBlocks);
  });

  it('should log sourceId and throw error when failing to retrieve articles', async () => {
    const error = new Error('failed to retrieve');
    (getRawArticles as jest.Mock).mockRejectedValue(error);
    const sourceId = Strap.Business;

    await expect(
      basicArticleListHandler(
        jest.fn(),
        {
          type: HandlerInputType.ArticleList,
          strapName,
          sourceId,
          totalBasicArticlesUnit: 3
        },
        params
      )
    ).rejects.toEqual(error);
    expect(logger.error).toHaveBeenCalledWith(
      params.apiRequestId,
      expect.stringContaining(sourceId)
    );
  });
});
