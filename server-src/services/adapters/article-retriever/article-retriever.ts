import { Section } from '../../section';
import { Strap } from '../../strap';
import { IParams } from '../../__types__/IParams';
import { getSectionArticleList } from '../jsonfeed';
import { getStrapArticles } from '../strap-list-service';

export const getRawArticles = async (
  sourceId: Section | Strap,
  totalArticles: number,
  params: IParams
) => {
  const sourceIsASection = Object.values(Section).includes(sourceId as Section);

  if (sourceIsASection) {
    return (await getSectionArticleList(
      sourceId as Section,
      totalArticles,
      params
    )).slice(0, totalArticles);
  }
  return await getStrapArticles(params, sourceId as Strap, totalArticles);
};
