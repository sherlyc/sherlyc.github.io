import { IContentBlock } from '../../../../common/__types__/IContentBlock';
import { IParams } from '../../__types__/IParams';
import { ITopStoriesArticleListHandlerInput } from '../__types__/ITopStoriesArticleListHandlerInput';
import { handlerRunnerFunction } from '../runner';
import { controlGroupArticles } from './control-group-articles';
import { groupOneArticles } from './TopStoriesVisualExperiment/group-one-articles';
import { groupTwoArticles } from './TopStoriesVisualExperiment/group-two-articles';
import { getRawArticles } from '../../adapters/article-retriever/article-retriever';
import { LayoutType } from '../../adapters/__types__/LayoutType';
import { layoutRetriever } from '../../adapters/layout-retriever';
import logger from '../../utils/logger';
import { Strap } from '../../strap';
import { Section } from '../../section';

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
    sourceId,
    strapName,
    totalArticles = 0,
    variant = 'control'
  }: ITopStoriesArticleListHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const layout = await retrieveLayout(params);
  let rawArticles = await getRawArticles(sourceId, totalArticles, params);

  if (
    (sourceId === Strap.TopStories || sourceId === Section.Latest) &&
    layout === LayoutType.DEFAULT
  ) {
    rawArticles = [
      rawArticles[1],
      rawArticles[0],
      ...rawArticles.slice(2)
    ].filter(Boolean);
  }

  if (variant === 'groupOne') {
    return groupOneArticles(rawArticles, strapName);
  } else if (variant === 'groupTwo') {
    return groupTwoArticles(rawArticles, strapName);
  }

  return controlGroupArticles(rawArticles, strapName);
}
