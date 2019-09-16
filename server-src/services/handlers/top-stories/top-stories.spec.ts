import { HandlerInputType } from '../__types__/HandlerInputType';
import { IParams } from '../../__types__/IParams';
import topStoriesHandler from './top-stories';
import { ITopStoriesHandlerInput } from '../__types__/ITopStoriesHandlerInput';
import * as layoutRetriever from '../../../services/adapters/layout-retriever';
import { LayoutType } from '../../adapters/__types__/LayoutType';
import logger from '../../utils/logger';
import { Strap } from '../../strap';
import { IExperimentHandlerInput } from '../__types__/IExperimentHandlerInput';

describe('TopStoriesHandler', () => {
  const params: IParams = { apiRequestId: 'request-id-for-testing' };
  const strapName = 'Latest';

  test.each([[LayoutType.DEFAULT], [LayoutType.BIG_HEADLINE]])(
    'should return experiment container with control, group one and group two variants when layout is %s',
    async (layoutType: LayoutType) => {
      jest
        .spyOn(layoutRetriever, 'layoutRetriever')
        .mockResolvedValue(layoutType);
      const handlerFunction = jest.fn();
      const handlerInput: ITopStoriesHandlerInput = {
        type: HandlerInputType.TopStories,
        sourceId: Strap.TopStories,
        strapName: strapName,
        totalBasicArticlesUnit: 3,
        totalBasicArticleTitleUnit: 3
      };
      const experimentHandlerInput: IExperimentHandlerInput = {
        type: HandlerInputType.Experiment,
        name: 'TopStoriesVisualExperiment',
        variants: {
          control: {
            type: HandlerInputType.ArticleList,
            sourceId: Strap.TopStories,
            strapName,
            layout: layoutType,
            totalBasicArticlesUnit: handlerInput.totalBasicArticlesUnit,
            totalBasicArticleTitleUnit: handlerInput.totalBasicArticleTitleUnit,
            variant: 'control'
          },
          groupOne: {
            type: HandlerInputType.ArticleList,
            sourceId: Strap.TopStories,
            strapName,
            layout: layoutType,
            totalBasicArticlesUnit: handlerInput.totalBasicArticlesUnit,
            totalBasicArticleTitleUnit: handlerInput.totalBasicArticleTitleUnit,
            variant: 'groupOne'
          },
          groupTwo: {
            type: HandlerInputType.ArticleList,
            sourceId: Strap.TopStories,
            strapName,
            layout: layoutType,
            totalBasicArticlesUnit: handlerInput.totalBasicArticlesUnit,
            totalBasicArticleTitleUnit: handlerInput.totalBasicArticleTitleUnit,
            variant: 'groupTwo'
          }
        }
      };

      await topStoriesHandler(handlerFunction, handlerInput, params);

      expect(handlerFunction).toHaveBeenCalledWith(
        experimentHandlerInput,
        params
      );
    }
  );

  it('should return experiment container with control, group one and group two variants when layout is defcon', async () => {
    jest
      .spyOn(layoutRetriever, 'layoutRetriever')
      .mockResolvedValue(LayoutType.DEFCON);
    const handlerFunction = jest.fn();
    const handlerInput: ITopStoriesHandlerInput = {
      type: HandlerInputType.TopStories,
      sourceId: Strap.TopStories,
      strapName: strapName,
      totalBasicArticlesUnit: 6
    };
    const experimentHandlerInput: IExperimentHandlerInput = {
      type: HandlerInputType.Experiment,
      name: 'TopStoriesVisualExperiment',
      variants: {
        control: {
          type: HandlerInputType.DefconArticleList,
          sourceId: Strap.TopStories,
          strapName,
          layoutType: LayoutType.DEFCON,
          totalArticles: handlerInput.totalBasicArticlesUnit,
          variant: 'control'
        },
        groupOne: {
          type: HandlerInputType.DefconArticleList,
          sourceId: Strap.TopStories,
          strapName,
          layoutType: LayoutType.DEFCON,
          totalArticles: handlerInput.totalBasicArticlesUnit,
          variant: 'groupOne'
        },
        groupTwo: {
          type: HandlerInputType.DefconArticleList,
          sourceId: Strap.TopStories,
          strapName,
          layoutType: LayoutType.DEFCON,
          totalArticles: handlerInput.totalBasicArticlesUnit,
          variant: 'groupTwo'
        }
      }
    };

    await topStoriesHandler(handlerFunction, handlerInput, params);

    expect(handlerFunction).toHaveBeenCalledWith(
      experimentHandlerInput,
      params
    );
  });

  it('should return experiment container with default layout and log error when failing to retrieve layout', async () => {
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
    const experimentHandlerInput: IExperimentHandlerInput = {
      type: HandlerInputType.Experiment,
      name: 'TopStoriesVisualExperiment',
      variants: {
        control: {
          type: HandlerInputType.ArticleList,
          sourceId: Strap.TopStories,
          strapName,
          layout: LayoutType.DEFAULT,
          totalBasicArticlesUnit: handlerInput.totalBasicArticlesUnit,
          totalBasicArticleTitleUnit: handlerInput.totalBasicArticleTitleUnit,
          variant: 'control'
        },
        groupOne: {
          type: HandlerInputType.ArticleList,
          sourceId: Strap.TopStories,
          strapName,
          layout: LayoutType.DEFAULT,
          totalBasicArticlesUnit: handlerInput.totalBasicArticlesUnit,
          totalBasicArticleTitleUnit: handlerInput.totalBasicArticleTitleUnit,
          variant: 'groupOne'
        },
        groupTwo: {
          type: HandlerInputType.ArticleList,
          sourceId: Strap.TopStories,
          strapName,
          layout: LayoutType.DEFAULT,
          totalBasicArticlesUnit: handlerInput.totalBasicArticlesUnit,
          totalBasicArticleTitleUnit: handlerInput.totalBasicArticleTitleUnit,
          variant: 'groupTwo'
        }
      }
    };

    await topStoriesHandler(handlerFunction, handlerInput, params);

    expect(handlerFunction).toHaveBeenCalledWith(
      experimentHandlerInput,
      params
    );
    expect(loggerSpy).toHaveBeenCalled();
  });
});
