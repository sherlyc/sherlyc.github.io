import { handlerRunnerFunction } from '../runner';
import { ITopStoriesHandlerInput } from '../__types__/ITopStoriesHandlerInput';
import { IParams } from '../../__types__/IParams';
import { IContentBlock } from '../../../../common/__types__/IContentBlock';
import { getRawArticles } from '../../adapters/article-retriever/article-retriever';
import { LayoutType } from '../../adapters/__types__/LayoutType';
import { HandlerInputType } from '../__types__/HandlerInputType';
import { Experiments } from '../../../../common/Experiments';
import { Strap } from '../../strap';

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
  const totalArticles = totalBasicArticlesUnit + totalBasicArticleTitleUnit;
  const rawArticles = await getRawArticles(sourceId, totalArticles, params);

  return handlerRunner(
    {
      type: HandlerInputType.Experiment,
      name: Experiments.TopStoriesVisualExperiment,
      variants: {
        control: {
          type: HandlerInputType.TopStoriesArticleList,
          sourceId: Strap.TopStories,
          strapName,
          totalArticles: totalBasicArticlesUnit,
          variant: 'control'
        },
        groupOne: {
          type: HandlerInputType.TopStoriesArticleList,
          sourceId: Strap.TopStories,
          strapName,
          totalArticles: totalBasicArticlesUnit,
          variant: 'groupOne'
        },
        groupTwo: {
          type: HandlerInputType.TopStoriesArticleList,
          sourceId: Strap.TopStories,
          strapName,
          totalArticles: totalBasicArticlesUnit,
          variant: 'groupTwo'
        }
      }
    },
    params
  );
}
