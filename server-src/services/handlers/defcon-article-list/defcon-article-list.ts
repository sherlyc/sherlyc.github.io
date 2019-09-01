import { IContentBlock } from '../../../../common/__types__/IContentBlock';
import { IParams } from '../../../services/__types__/IParams';
import { IDefconArticleListHandlerInput } from '../__types__/IDefconArticleListHandlerInput';
import { handlerRunnerFunction } from '../runner';
import { Strap } from '../../strap';
import { getStrapArticles } from '../../adapters/strap-list-service';
import { controlGroupArticles } from './control-group-articles';
import { groupOneArticles } from './TopStoriesVisualExperiment/group-one-articles';
import { groupTwoArticles } from './TopStoriesVisualExperiment/group-two-articles';


export default async function(
  handlerRunner: handlerRunnerFunction,
  {
    sourceId,
    strapName,
    totalArticles = 0,
    variant = 'control'
  }: IDefconArticleListHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const rawArticles = await getStrapArticles(
    params,
    Strap.TopStories,
    totalArticles
  );

  if (variant === 'groupOne') {
    return groupOneArticles(rawArticles, strapName);
  } else if (variant === 'groupTwo') {
    return groupTwoArticles(rawArticles, strapName);
  }

  return controlGroupArticles(rawArticles, strapName);
}
