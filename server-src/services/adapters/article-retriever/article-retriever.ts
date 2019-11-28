import { Section } from '../../section';
import { Strap } from '../../strap';
import { IParams } from '../../__types__/IParams';
import { getSectionArticleList } from '../jsonfeed/jsonfeed';
import { getStrapArticles } from '../strap-list/strap-list-service';
import { IRawArticle } from '../__types__/IRawArticle';

export const getRawArticles = async (
  sourceId: Section | Strap,
  totalArticles: number,
  params: IParams
): Promise<IRawArticle[]> => {
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
