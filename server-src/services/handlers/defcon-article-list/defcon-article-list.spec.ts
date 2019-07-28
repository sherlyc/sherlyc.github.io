import { IRawArticle } from '../../adapters/__types__/IRawArticle';
import { IDefconArticleListHandlerInput } from '../__types__/IDefconArticleListHandlerInput';
import { HandlerInputType } from '../__types__/HandlerInputType';
import handlerRunner from '../runner';
import { ListAsset } from '../../listAsset';
import * as jsonfeed from '../../adapters/jsonfeed';
import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';
import { IParams } from '../../__types__/IParams';
import defconArticleList from './defcon-article-list';
import { IDefconArticleUnit } from '../../../../common/__types__/IDefconArticleUnit';
import { IBasicArticleUnit } from '../../../../common/__types__/IBasicArticleUnit';
import { getStrapArticles } from '../../adapters/strap-list-service';

jest.mock('../../adapters/strap-list-service');

describe('DefconArticleList', () => {
  const params: IParams = { apiRequestId: 'request-id-for-testing' };
  const strapName = 'Latest';

  const basicAdUnit = {
    type: 'BasicAdUnit'
  };

  const articleOne: IRawArticle = {
    id: '1',
    indexHeadline: 'Defcon Headline',
    introText: 'Defcon Intro',
    linkUrl: '/link1',
    imageSrc: 'article.jpg',
    imageSrcSet: 'article.jpg 1w',
    defconSrc: 'defcon.jpg',
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
    lastPublishedTime: 1,
    headlineFlags: []
  };

  const articleOneAsDefconArticle: IDefconArticleUnit = {
    type: ContentBlockType.DefconArticleUnit,
    strapName,
    id: '1',
    indexHeadline: 'Defcon Headline',
    introText: 'Defcon Intro',
    linkUrl: '/link1',
    imageSrc: 'defcon.jpg',
    lastPublishedTime: 1,
    headlineFlags: []
  };

  const articleTwoAsBasicArticle: IBasicArticleUnit = {
    type: ContentBlockType.BasicArticleUnit,
    strapName,
    id: '2',
    indexHeadline: 'An Article',
    introText: 'Article Text',
    linkUrl: '/link1',
    imageSrc: 'article.jpg',
    imageSrcSet: 'article.jpg 1w',
    lastPublishedTime: 1,
    headlineFlags: []
  };

  beforeEach(() => {
    jest.resetModules();
  });

  it('should return first article as defcon and others as basic articles when input ListAsset.TopStories', async () => {
    const handlerInput: IDefconArticleListHandlerInput = {
      type: HandlerInputType.DefconArticleList,
      sourceId: ListAsset.TopStories,
      strapName,
      totalArticles: 2
    };
    const rawArticles = [articleOne, articleTwo];

    jest.spyOn(jsonfeed, 'getListAsset').mockResolvedValue(rawArticles);

    const expectedContentBlocks = [
      articleOneAsDefconArticle,
      basicAdUnit,
      articleTwoAsBasicArticle,
      basicAdUnit
    ];

    const contentBlocks = await defconArticleList(
      handlerRunner,
      handlerInput,
      params
    );

    expect(contentBlocks).toEqual(expectedContentBlocks);
  });

  it('should return first article as defcon and others as basic articles when input Strap.TopStories', async () => {
    const handlerInput: IDefconArticleListHandlerInput = {
      type: HandlerInputType.DefconArticleList,
      sourceId: ListAsset.TopStories,
      strapName,
      totalArticles: 2
    };
    const rawArticles = [articleOne, articleTwo];

    (getStrapArticles as jest.Mock).mockResolvedValueOnce(rawArticles);

    const expectedContentBlocks = [
      articleOneAsDefconArticle,
      basicAdUnit,
      articleTwoAsBasicArticle,
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
    const error = new Error('failed to retrieve');
    const handlerInput: IDefconArticleListHandlerInput = {
      type: HandlerInputType.DefconArticleList,
      sourceId: ListAsset.TopStories,
      strapName,
      totalArticles: 2
    };

    jest.spyOn(jsonfeed, 'getListAsset').mockRejectedValue(error);

    await expect(
      defconArticleList(handlerRunner, handlerInput, params)
    ).rejects.toEqual(error);
  });
});
