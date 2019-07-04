import { HandlerInputType } from '../__types__/HandlerInputType';
import { IParams } from '../../../services/__types__/IParams';
import topStoriesHandler from './top-stories';
import { ITopStoriesHandlerInput } from '../__types__/ITopStoriesHandlerInput';
import * as jsonfeed from '../../adapters/jsonfeed';
import handlerRunner from '../runner';
import * as layoutRetriever from '../../../services/adapters/layout-retriever';
import { LayoutType } from '../../../services/adapters/__types__/LayoutType';
import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';

describe('TopStoriesHandler', () => {
  const params: IParams = { apiRequestId: 'request-id-for-testing' };

  const basicAdUnit = {
    type: 'BasicAdUnit'
  };

  const article = {
    id: '1',
    indexHeadline: 'Headline 1',
    introText: 'Intro 1',
    linkUrl: '/link1',
    imageSrc: '1.jpg',
    imageSrcSet: '1.jpg 1w',
    lastPublishedTime: 1,
    headlineFlags: []
  };

  const articleAsBasicArticle = {
    type: ContentBlockType.BasicArticleUnit,
    id: '1',
    strapName: 'Latest',
    headlineFlags: [],
    imageSrc: '1.jpg',
    imageSrcSet: '1.jpg 1w',
    indexHeadline: 'Headline 1',
    introText: 'Intro 1',
    lastPublishedTime: 1,
    linkUrl: '/link1'
  };

  const articleAsDefconArticle = {
    type: ContentBlockType.DefconArticleUnit,
    id: '1',
    strapName: 'Latest',
    headlineFlags: [],
    imageSrc: '1.jpg',
    imageSrcSet: '1.jpg 1w',
    indexHeadline: 'Headline 1',
    introText: 'Intro 1',
    lastPublishedTime: 1,
    linkUrl: '/link1'
  };

  beforeEach(() => {
    jest.resetModules();
  });

  it('should return basic articles when layout is default', async () => {
    const handlerInput: ITopStoriesHandlerInput = {
      type: HandlerInputType.TopStories,
      strapName: 'Latest',
      totalBasicArticlesUnit: 3
    };
    const rawArticles = [article, article, article];

    jest.spyOn(jsonfeed, 'getListAsset').mockResolvedValue(rawArticles);
    jest
      .spyOn(layoutRetriever, 'layoutRetriever')
      .mockResolvedValue(LayoutType.DEFAULT);

    const expectedContentBlocks = [
      basicAdUnit,
      articleAsBasicArticle,
      basicAdUnit,
      articleAsBasicArticle,
      basicAdUnit,
      articleAsBasicArticle,
      basicAdUnit
    ];

    const contentBlocks = await topStoriesHandler(
      handlerRunner,
      handlerInput,
      params
    );

    expect(contentBlocks).toEqual(expectedContentBlocks);
  });
});
