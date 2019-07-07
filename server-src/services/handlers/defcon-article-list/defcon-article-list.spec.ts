import { IRawArticle } from '../../adapters/__types__/IRawArticle';
import { IDefconArticleListHandlerInput } from '../__types__/IDefconArticleListHandlerInput';
import { HandlerInputType } from '../__types__/HandlerInputType';
import { LayoutType } from '../../../services/adapters/__types__/LayoutType';
import handlerRunner from '../runner';
import { ListAsset } from '../../../services/listAsset';
import * as jsonfeed from '../../adapters/jsonfeed';
import * as layoutRetriever from '../../../services/adapters/layout-retriever';
import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';
import { IParams } from '../../../services/__types__/IParams';
import defconArticleList from './defcon-article-list';
import { IDefconArticleUnit } from '../../../../common/__types__/IDefconArticleUnit';
import { IBasicArticleUnit } from '../../../../common/__types__/IBasicArticleUnit';

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

  it('should return first article as defcon and others as basic articles when layout is defcon', async () => {
    const handlerInput: IDefconArticleListHandlerInput = {
      type: HandlerInputType.DefconArticleList,
      sourceId: ListAsset.TopStories,
      strapName,
      totalArticles: 2
    };
    const rawArticles = [articleOne, articleTwo];

    jest.spyOn(jsonfeed, 'getListAsset').mockResolvedValue(rawArticles);
    jest
      .spyOn(layoutRetriever, 'layoutRetriever')
      .mockResolvedValue(LayoutType.DEFCON);

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
});
