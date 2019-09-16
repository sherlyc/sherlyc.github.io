import { IContentBlock } from '../../../../common/__types__/IContentBlock';
import { IParams } from '../../__types__/IParams';
import { ITopStoriesArticleListHandlerInput } from '../__types__/ITopStoriesArticleListHandlerInput';
import { handlerRunnerFunction } from '../runner';
import { controlGroupArticles } from './control-group-articles';
import { groupOneArticles } from './TopStoriesVisualExperiment/group-one-articles';
import { groupTwoArticles } from './TopStoriesVisualExperiment/group-two-articles';
import { getRawArticles } from '../../adapters/article-retriever/article-retriever';
import { LayoutType } from '../../adapters/__types__/LayoutType';

export default async function(
  handlerRunner: handlerRunnerFunction,
  {
    sourceId,
    strapName,
    totalArticles = 0,
    layoutType,
    variant = 'control'
  }: ITopStoriesArticleListHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const rawArticles = await getRawArticles(
    sourceId,
    totalArticles,
    LayoutType.DEFCON,
    params
  );

  if (variant === 'groupOne') {
    return groupOneArticles(rawArticles, strapName);
  } else if (variant === 'groupTwo') {
    return groupTwoArticles(rawArticles, strapName);
  }

  return controlGroupArticles(rawArticles, strapName);
}
