import { IRawArticle } from '../../adapters/__types__/IRawArticle';
import { ITopStoriesArticleListHandlerInput } from '../__types__/ITopStoriesArticleListHandlerInput';
import { HandlerInputType } from '../__types__/HandlerInputType';
import handlerRunner from '../runner';
import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';
import { IParams } from '../../__types__/IParams';
import defconArticleList from './top-stories-article-list';
import { IDefconArticleUnit } from '../../../../common/__types__/IDefconArticleUnit';
import { IBasicArticleUnit } from '../../../../common/__types__/IBasicArticleUnit';
import { Strap } from '../../strap';
import { IBigImageArticleUnit } from '../../../../common/__types__/IBigImageArticleUnit';
import { IHalfWidthImageArticleUnit } from '../../../../common/__types__/IHalfWidthImageArticleUnit';
import { IGrayDefconArticleUnit } from '../../../../common/__types__/IGrayDefconArticleUnit';
import * as layoutRetriever from '../../../services/adapters/layout-retriever';
import { LayoutType } from '../../adapters/__types__/LayoutType';
import { getRawArticles } from '../../adapters/article-retriever/article-retriever';

jest.mock('../../adapters/article-retriever/article-retriever');

describe('Top Stories Article List', () => {
  const params: IParams = { apiRequestId: 'request-id-for-testing' };
  const strapName = 'Latest';

  const basicAdUnit = {
    type: 'BasicAdUnit',
    context: strapName
  };

  const articleOne: IRawArticle = {
    id: '1',
    indexHeadline: 'Article One',
    introText: 'Article One Intro',
    linkUrl: '/link1',
    imageSrc: 'article.jpg',
    imageSrcSet: 'article.jpg 1w',
    defconSrc: 'defcon.jpg',
    strapImageSrc: 'strap1.jpg',
    strapImageSrcSet: 'strap1.jpg 1w',
    lastPublishedTime: 1,
    headlineFlags: []
  };

  const articleTwo: IRawArticle = {
    id: '2',
    indexHeadline: 'An Article',
    introText: 'Article Text',
    linkUrl: '/link1',
    imageSrc: 'article.jpg',
    imageSrcSet: 'article.jpg 1w',
    defconSrc: null,
    strapImageSrc: 'strap2.jpg',
    strapImageSrcSet: 'strap2.jpg 1w',
    lastPublishedTime: 1,
    headlineFlags: []
  };

  const AsDefconArticle = (article: IRawArticle): IDefconArticleUnit => ({
    type: ContentBlockType.DefconArticleUnit,
    id: article.id,
    strapName: strapName,
    indexHeadline: article.indexHeadline,
    introText: article.introText,
    linkUrl: article.linkUrl,
    imageSrc: article.imageSrc,
    lastPublishedTime: article.lastPublishedTime,
    headlineFlags: article.headlineFlags
  });

  const AsBasicArticle = (article: IRawArticle): IBasicArticleUnit => ({
    type: ContentBlockType.BasicArticleUnit,
    id: article.id,
    strapName: strapName,
    indexHeadline: article.indexHeadline,
    introText: article.introText,
    linkUrl: article.linkUrl,
    imageSrc: article.imageSrc,
    imageSrcSet: article.imageSrcSet,
    lastPublishedTime: article.lastPublishedTime,
    headlineFlags: article.headlineFlags
  });

  beforeEach(() => {
    jest.resetModules();
  });

  it('should swap first and second articles when layout is default', async () => {
    jest
      .spyOn(layoutRetriever, 'layoutRetriever')
      .mockResolvedValue(LayoutType.DEFAULT);

    const handlerInput: ITopStoriesArticleListHandlerInput = {
      type: HandlerInputType.TopStoriesArticleList,
      sourceId: Strap.TopStories,
      strapName,
      totalArticles: 2,
      variant: 'control'
    };
    const rawArticles = [articleOne, articleTwo];

    (getRawArticles as jest.Mock).mockResolvedValueOnce(rawArticles);

    const expectedContentBlocks = [
      AsBasicArticle(articleTwo),
      basicAdUnit,
      AsBasicArticle(articleOne),
      basicAdUnit
    ];

    const contentBlocks = await defconArticleList(
      handlerRunner,
      handlerInput,
      params
    );

    expect(contentBlocks).toEqual(expectedContentBlocks);
  });

  it('should return basic articles when layout is default', async () => {
    jest
      .spyOn(layoutRetriever, 'layoutRetriever')
      .mockResolvedValue(LayoutType.DEFAULT);
    const handlerInput: ITopStoriesArticleListHandlerInput = {
      type: HandlerInputType.TopStoriesArticleList,
      sourceId: Strap.TopStories,
      strapName,
      totalArticles: 2,
      variant: 'control'
    };
    const rawArticles = [articleOne, articleTwo];

    (getRawArticles as jest.Mock).mockResolvedValueOnce(rawArticles);

    const expectedContentBlocks = [
      AsBasicArticle(articleOne),
      basicAdUnit,
      AsBasicArticle(articleTwo),
      basicAdUnit
    ];

    const contentBlocks = await defconArticleList(
      handlerRunner,
      handlerInput,
      params
    );
    console.log(contentBlocks);

    expect(contentBlocks).toEqual(expectedContentBlocks);
  });

  it('should return first article as defcon and others as basic articles when layout is defcon', async () => {
    jest
      .spyOn(layoutRetriever, 'layoutRetriever')
      .mockResolvedValue(LayoutType.DEFCON);
    const handlerInput: ITopStoriesArticleListHandlerInput = {
      type: HandlerInputType.TopStoriesArticleList,
      sourceId: Strap.TopStories,
      strapName,
      totalArticles: 2,
      variant: 'control'
    };
    const rawArticles = [articleOne, articleTwo];

    (getRawArticles as jest.Mock).mockResolvedValueOnce(rawArticles);

    const expectedContentBlocks = [
      AsDefconArticle(articleOne),
      basicAdUnit,
      AsBasicArticle(articleTwo),
      basicAdUnit
    ];

    const contentBlocks = await defconArticleList(
      handlerRunner,
      handlerInput,
      params
    );

    expect(contentBlocks).toEqual(expectedContentBlocks);
  });

  it('should throw error when failing to retrieve articles', async () => {
    jest
      .spyOn(layoutRetriever, 'layoutRetriever')
      .mockResolvedValue(LayoutType.DEFCON);
    const error = new Error('failed to retrieve');
    const handlerInput: ITopStoriesArticleListHandlerInput = {
      type: HandlerInputType.TopStoriesArticleList,
      sourceId: Strap.TopStories,
      strapName,
      totalArticles: 2,
      variant: 'control'
    };

    (getRawArticles as jest.Mock).mockRejectedValue(error);

    await expect(
      defconArticleList(handlerRunner, handlerInput, params)
    ).rejects.toEqual(error);
  });

});
