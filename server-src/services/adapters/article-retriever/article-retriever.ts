import { Section } from '../../section';
import { Strap } from '../../strap';
import { LayoutType } from '../__types__/LayoutType';
import { IParams } from '../../__types__/IParams';
import { getSectionArticleList } from '../jsonfeed';
import { getStrapArticles } from '../strap-list-service';

export const getRawArticles = async (
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
