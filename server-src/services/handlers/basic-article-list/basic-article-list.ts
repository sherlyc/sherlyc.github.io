import { IContentBlock } from '../../../../common/__types__/IContentBlock';
import { IBasicArticleListHandlerInput } from '../__types__/IBasicArticleListHandlerInput';
import { handlerRunnerFunction } from '../runner';
import { IParams } from '../../__types__/IParams';
import { LayoutType } from '../../adapters/__types__/LayoutType';
import { Strap } from '../../strap';
import { getStrapArticles } from '../../adapters/strap-list-service';
import { Section } from '../../section';
import { getSectionArticleList } from '../../adapters/jsonfeed';
import { controlGroupArticles } from './control-group-articles';
import { groupOneArticles } from './TopStoriesVisualExperiment/group-one-articles';
import { groupTwoArticles } from './TopStoriesVisualExperiment/group-two-articles';

const getRawArticles = async (
  sourceId: Section | Strap,
  totalArticles: number,
  layout: LayoutType,
  params: IParams
) => {
  const sourceIsASection = Object.values(Section).includes(sourceId);
  let rawArticles;

  if (sourceIsASection) {
    return (await getSectionArticleList(
      sourceId as Section,
      totalArticles,
      params
    )).slice(0, totalArticles);
  } else {
    rawArticles = await getStrapArticles(
      params,
      sourceId as Strap,
      totalArticles
    );
  }

  return (sourceId === Strap.TopStories || sourceId === Section.Latest) &&
    layout === LayoutType.DEFAULT
    ? [rawArticles[1], rawArticles[0], ...rawArticles.slice(2)].filter(Boolean)
    : rawArticles;
};

export default async function(
  handlerRunner: handlerRunnerFunction,
  {
    sourceId,
    totalBasicArticlesUnit = 0,
    totalBasicArticleTitleUnit = 0,
    strapName,
    layout = LayoutType.DEFAULT,
    variant = 'control'
  }: IBasicArticleListHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const totalArticles = totalBasicArticlesUnit + totalBasicArticleTitleUnit;
  const rawArticles = await getRawArticles(
    sourceId,
    totalArticles,
    layout,
    params
  );

  if (variant === 'groupOne') {
    return groupOneArticles(rawArticles, strapName);
  } else if (variant === 'groupTwo') {
    return groupTwoArticles(rawArticles, strapName);
  }
  return controlGroupArticles(
    rawArticles,
    totalBasicArticlesUnit,
    strapName
  );
}
