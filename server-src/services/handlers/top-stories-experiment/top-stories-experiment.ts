import { handlerRunnerFunction } from '../runner';
import { ITopStoriesHandlerInput } from '../__types__/ITopStoriesHandlerInput';
import { IParams } from '../../__types__/IParams';
import { IContentBlock } from '../../../../common/__types__/IContentBlock';
import { HandlerInputType } from '../__types__/HandlerInputType';
import { Experiments } from '../../../../common/Experiments';

export default async function(
  handlerRunner: handlerRunnerFunction,
  { strapName, totalArticles }: ITopStoriesHandlerInput,
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
          totalArticles
        },
        groupOne: {
          type: HandlerInputType.TopStoriesArticleListGroupOne,
          strapName,
          totalArticles
        },
        groupTwo: {
          type: HandlerInputType.TopStoriesArticleListGroupTwo,
          strapName,
          totalArticles
        }
      }
    },
    params
  );
}
