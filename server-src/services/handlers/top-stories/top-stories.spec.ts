import { HandlerInputType } from '../__types__/HandlerInputType';
import { IParams } from '../../../services/__types__/IParams';
import topStoriesHandler from './top-stories';
import { ITopStoriesHandlerInput } from '../__types__/ITopStoriesHandlerInput';
import * as jsonfeed from '../../adapters/jsonfeed';
import handlerRunner from '../runner';
import * as layoutRetriever from '../../../services/adapters/layout-retriever';
import { LayoutType } from '../../../services/adapters/__types__/LayoutType';
import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';
import { ListAsset } from '../../../services/listAsset';
import { IBasicArticleListHandlerInput } from '../__types__/IBasicArticleListHandlerInput';
import { IDefconArticleListHandlerInput } from '../__types__/IDefconArticleListHandlerInput';

describe('TopStoriesHandler', () => {
  const params: IParams = { apiRequestId: 'request-id-for-testing' };
  const strapName = 'Latest';

  it('should create basic article list when layout retrieved is default', async () => {
    jest
      .spyOn(layoutRetriever, 'layoutRetriever')
      .mockResolvedValue(LayoutType.DEFAULT);
    const handlerFunction = jest.fn();
    const handlerInput: ITopStoriesHandlerInput = {
      type: HandlerInputType.TopStories,
      strapName: strapName,
      totalBasicArticlesUnit: 3,
      totalBasicArticleTitleUnit: 3
    };
    const basicArticleListInput: IBasicArticleListHandlerInput = {
      type: HandlerInputType.ArticleList,
      sourceId: ListAsset.TopStories,
      strapName,
      totalBasicArticlesUnit: 3,
      totalBasicArticleTitleUnit: 3
    };

    await topStoriesHandler(handlerFunction, handlerInput, params);

    expect(handlerFunction).toHaveBeenCalledWith(basicArticleListInput, params);
  });

  it('should create defcon article list when layout retrieved is defcon', async () => {
    jest
      .spyOn(layoutRetriever, 'layoutRetriever')
      .mockResolvedValue(LayoutType.DEFCON);
    const handlerFunction = jest.fn();
    const handlerInput: ITopStoriesHandlerInput = {
      type: HandlerInputType.TopStories,
      strapName: strapName,
      totalBasicArticlesUnit: 3
    };
    const basicArticleListInput: IDefconArticleListHandlerInput = {
      type: HandlerInputType.DefconArticleList,
      sourceId: ListAsset.TopStories,
      strapName,
      totalArticles: 3
    };

    await topStoriesHandler(handlerFunction, handlerInput, params);

    expect(handlerFunction).toHaveBeenCalledWith(basicArticleListInput, params);
  });
});
