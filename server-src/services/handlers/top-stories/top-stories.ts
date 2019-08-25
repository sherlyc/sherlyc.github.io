import { IContentBlock } from '../../../../common/__types__/IContentBlock';
import { ITopStoriesHandlerInput } from '../__types__/ITopStoriesHandlerInput';
import { handlerRunnerFunction } from '../runner';
import { IParams } from '../../__types__/IParams';
import { HandlerInputType } from '../__types__/HandlerInputType';
import { layoutRetriever } from '../../adapters/layout-retriever';
import { LayoutType } from '../../adapters/__types__/LayoutType';
import logger from '../../utils/logger';
import { Strap } from '../../strap';
import { Experiments } from '../../../../common/Experiments';

const retrieveLayout = async (params: IParams): Promise<LayoutType> => {
  try {
    return await layoutRetriever(params);
  } catch (error) {
    logger.error(
      params.apiRequestId,
      `Top Stories Handler - retrieveLayout error - ${error.message}`
    );
    return LayoutType.DEFAULT;
  }
};

export default async function(
  handlerRunner: handlerRunnerFunction,
  {
    strapName,
    totalBasicArticlesUnit = 0,
    totalBasicArticleTitleUnit = 0,
    sourceId
  }: ITopStoriesHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const layout = await retrieveLayout(params);
  switch (layout) {
    case LayoutType.DEFCON:
      return handlerRunner(
        {
          type: HandlerInputType.Experiment,
          name: Experiments.TopStoriesVisualExperiment,
          variants: {
            control: {
              type: HandlerInputType.DefconArticleList,
              sourceId: Strap.TopStories,
              strapName,
              totalArticles: totalBasicArticlesUnit,
              variant: 'control'
            },
            groupOne: {
              type: HandlerInputType.DefconArticleList,
              sourceId: Strap.TopStories,
              strapName,
              totalArticles: 3,
              variant: 'groupOne'
            },
            groupTwo: {
              type: HandlerInputType.DefconArticleList,
              sourceId: Strap.TopStories,
              strapName,
              totalArticles: 3,
              variant: 'groupTwo'
            }
          }
        },
        params
      );
    case LayoutType.BIG_HEADLINE:
      return handlerRunner(
        {
          type: HandlerInputType.ArticleList,
          sourceId,
          strapName,
          layout: LayoutType.BIG_HEADLINE,
          totalBasicArticlesUnit,
          totalBasicArticleTitleUnit,
          variant: 'control'
        },
        params
      );
    default:
      return handlerRunner(
        {
          type: HandlerInputType.Experiment,
          name: 'TopStoriesVisualExperiment',
          variants: {
            control: {
              type: HandlerInputType.ArticleList,
              sourceId: Strap.TopStories,
              strapName,
              layout: LayoutType.DEFAULT,
              totalBasicArticlesUnit,
              totalBasicArticleTitleUnit,
              variant: 'control'
            },
            groupOne: {
              type: HandlerInputType.ArticleList,
              sourceId: Strap.TopStories,
              strapName,
              layout: LayoutType.DEFAULT,
              totalBasicArticlesUnit,
              totalBasicArticleTitleUnit,
              variant: 'groupOne'
            },
            groupTwo: {
              type: HandlerInputType.ArticleList,
              sourceId: Strap.TopStories,
              strapName,
              layout: LayoutType.DEFAULT,
              totalBasicArticlesUnit,
              totalBasicArticleTitleUnit,
              variant: 'groupTwo'
            }
          }
        },
        params
      );
  }
}
