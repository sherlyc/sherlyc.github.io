import { HandlerInputType } from '../__types__/HandlerInputType';
import { IParams } from '../../../services/__types__/IParams';
import topStoriesHandler from './top-stories';
import { ITopStoriesHandlerInput } from '../__types__/ITopStoriesHandlerInput';
import { getListAsset } from '../../adapters/jsonfeed';
import handlerRunner from '../runner';

jest.mock('../../adapters/jsonfeed');

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
    id: '1',
    strapName: 'Latest',
    headlineFlags: [],
    imageSrc: '1.jpg',
    imageSrcSet: '1.jpg 1w',
    indexHeadline: 'Headline 1',
    introText: 'Intro 1',
    lastPublishedTime: 1,
    linkUrl: '/link1',
    type: 'BasicArticleUnit'
  };

  beforeEach(() => {
    jest.resetModules();
  });

  it('should return default layout', async () => {
    const handlerInput: ITopStoriesHandlerInput = {
      type: HandlerInputType.TopStories,
      strapName: 'Latest',
      totalBasicArticlesUnit: 3
    };
    const rawArticles = [article, article, article];

    (getListAsset as jest.Mock).mockResolvedValue(rawArticles);

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
