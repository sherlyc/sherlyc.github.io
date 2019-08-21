import { HandlerInputType } from '../__types__/HandlerInputType';
import { IParams } from '../../__types__/IParams';
import topStoriesHandler from './top-stories';
import { ITopStoriesHandlerInput } from '../__types__/ITopStoriesHandlerInput';
import * as layoutRetriever from '../../../services/adapters/layout-retriever';
import { LayoutType } from '../../adapters/__types__/LayoutType';
import { IBasicArticleListHandlerInput } from '../__types__/IBasicArticleListHandlerInput';
import { IDefconArticleListHandlerInput } from '../__types__/IDefconArticleListHandlerInput';
import logger from '../../utils/logger';
import { Strap } from '../../strap';
import { IExperimentHandlerInput } from '../__types__/IExperimentHandlerInput';

describe('TopStoriesHandler', () => {
  const params: IParams = { apiRequestId: 'request-id-for-testing' };
  const strapName = 'Latest';

  it('should create basic article list with default layout when layout retrieved is default', async () => {
    jest
      .spyOn(layoutRetriever, 'layoutRetriever')
      .mockResolvedValue(LayoutType.DEFAULT);
    const handlerFunction = jest.fn();
    const handlerInput: ITopStoriesHandlerInput = {
      type: HandlerInputType.TopStories,
      sourceId: Strap.TopStories,
      strapName: strapName,
      totalBasicArticlesUnit: 3,
      totalBasicArticleTitleUnit: 3
    };
    const basicArticleListInput: IBasicArticleListHandlerInput = {
      type: HandlerInputType.ArticleList,
      sourceId: Strap.TopStories,
      strapName,
      layout: LayoutType.DEFAULT,
      totalBasicArticlesUnit: 3,
      totalBasicArticleTitleUnit: 3
    };

    await topStoriesHandler(handlerFunction, handlerInput, params);

    expect(handlerFunction).toHaveBeenCalledWith(basicArticleListInput, params);
  });

  it('should create basic article list with big headline layout when layout retrieved is big headline', async () => {
    jest
      .spyOn(layoutRetriever, 'layoutRetriever')
      .mockResolvedValue(LayoutType.BIG_HEADLINE);
    const handlerFunction = jest.fn();
    const handlerInput: ITopStoriesHandlerInput = {
      type: HandlerInputType.TopStories,
      sourceId: Strap.TopStories,
      strapName: strapName,
      totalBasicArticlesUnit: 3,
      totalBasicArticleTitleUnit: 3
    };
    const basicArticleListInput: IBasicArticleListHandlerInput = {
      type: HandlerInputType.ArticleList,
      sourceId: Strap.TopStories,
      strapName,
      layout: LayoutType.BIG_HEADLINE,
      totalBasicArticlesUnit: 3,
      totalBasicArticleTitleUnit: 3
    };

    await topStoriesHandler(handlerFunction, handlerInput, params);

    expect(handlerFunction).toHaveBeenCalledWith(basicArticleListInput, params);
  });

  it('should create basic article list with default layout and log error when failing to retrieve layout', async () => {
    jest
      .spyOn(layoutRetriever, 'layoutRetriever')
      .mockRejectedValue(new Error());
    const loggerSpy = jest.spyOn(logger, 'error');
    const handlerFunction = jest.fn();
    const handlerInput: ITopStoriesHandlerInput = {
      type: HandlerInputType.TopStories,
      sourceId: Strap.TopStories,
      strapName: strapName,
      totalBasicArticlesUnit: 3,
      totalBasicArticleTitleUnit: 1
    };
    const basicArticleListInput: IBasicArticleListHandlerInput = {
      type: HandlerInputType.ArticleList,
      sourceId: Strap.TopStories,
      strapName,
      layout: LayoutType.DEFAULT,
      totalBasicArticlesUnit: 3,
      totalBasicArticleTitleUnit: 1
    };

    await topStoriesHandler(handlerFunction, handlerInput, params);

    expect(handlerFunction).toHaveBeenCalledWith(basicArticleListInput, params);
    expect(loggerSpy).toHaveBeenCalled();
  });

  describe('when layout is defcon', () => {
    it('should return experiment container with control and group one variant', async () => {
      jest
        .spyOn(layoutRetriever, 'layoutRetriever')
        .mockResolvedValue(LayoutType.DEFCON);
      const handlerFunction = jest.fn();
      const handlerInput: ITopStoriesHandlerInput = {
        type: HandlerInputType.TopStories,
        sourceId: Strap.TopStories,
        strapName: strapName,
        totalBasicArticlesUnit: 3
      };
      const experimentHandlerInput: IExperimentHandlerInput = {
        type: HandlerInputType.Experiment,
        name: 'TopStoriesVisualExperiment',
        variants: {
          control: {
            type: HandlerInputType.DefconArticleList,
            sourceId: Strap.TopStories,
            strapName,
            totalArticles: 3,
            variant: 'control'
          },
          groupOne: {
            type: HandlerInputType.DefconArticleList,
            sourceId: Strap.TopStories,
            strapName,
            totalArticles: 3,
            variant: 'groupOne'
          }
        }
      };

      await topStoriesHandler(handlerFunction, handlerInput, params);

      expect(handlerFunction).toHaveBeenCalledWith(
        experimentHandlerInput,
        params
      );
    });
  });
});
