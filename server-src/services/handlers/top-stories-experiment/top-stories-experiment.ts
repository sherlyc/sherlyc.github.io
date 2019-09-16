import { handlerRunnerFunction } from '../runner';
import { ITopStoriesHandlerInput } from '../__types__/ITopStoriesHandlerInput';
import { IParams } from '../../__types__/IParams';
import { IContentBlock } from '../../../../common/__types__/IContentBlock';
import { HandlerInputType } from '../__types__/HandlerInputType';
import { Experiments } from '../../../../common/Experiments';

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
  return handlerRunner(
    {
      type: HandlerInputType.Experiment,
      name: Experiments.TopStoriesVisualExperiment,
      variants: {
        control: {
          type: HandlerInputType.TopStoriesArticleList,
          strapName,
          totalArticles: totalBasicArticlesUnit
        },
        groupOne: {
          type: HandlerInputType.TopStoriesArticleList,
          strapName,
          totalArticles: totalBasicArticlesUnit
        },
        groupTwo: {
          type: HandlerInputType.TopStoriesArticleList,
          strapName,
          totalArticles: totalBasicArticlesUnit
        }
      }
    },
    params
  );
}
