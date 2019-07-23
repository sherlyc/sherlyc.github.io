import { IParams } from '../__types__/IParams';
import { Strap } from '../strap';
import config from '../utils/config';
import { getListAssetById } from './jsonfeed';
import { IRawArticle } from './__types__/IRawArticle';
import { flatten } from 'lodash';

function deduplicate(
  articles: IRawArticle[],
  dedupeSource: IRawArticle[]
): IRawArticle[] {
  const mappedData = dedupeSource.map(
    (article) => [article.id, true] as [string, boolean]
  );
  const dupeDict = new Map<string, boolean>(mappedData);

  return articles.filter((asset) => !dupeDict.has(asset.id));
}

export const getStrapArticles = async (
  params: IParams,
  strap: Strap,
  total?: number
): Promise<IRawArticle[]> => {
  const strapArticlesIds = config.homepageStraps[strap].ids;
  const strapArticlesPromise = Promise.all(
    strapArticlesIds.map((listAssetId) => getListAssetById(params, listAssetId))
  );

  let dedupeSourcePromise: Promise<IRawArticle[][]> = Promise.resolve([[]]);

  const deduplicateSources = config.homepageStraps[strap].deduplicateFrom;
  if (deduplicateSources) {
    dedupeSourcePromise = getDeduplicationLists(params, deduplicateSources);
  }

  const [nestedStrapArticles, nestedDedupeSource] = await Promise.all([
    strapArticlesPromise,
    dedupeSourcePromise
  ]);
  const articles = flatten(nestedStrapArticles);
  const deduplicationSource = flatten(nestedDedupeSource);

  return deduplicate(articles, deduplicationSource).slice(0, total);
};

function getDeduplicationLists(params: IParams, strapNames: Strap[]) {
  return Promise.all(
    strapNames.map((strapToDedupeFrom) => {
      const dedupeFrom = config.homepageStraps[strapToDedupeFrom];
      const limit =
        (dedupeFrom.totalArticlesWithImages || 0) +
        (dedupeFrom.totalTitleArticles || 0);
      return getStrapArticles(
        params,
        strapToDedupeFrom as Strap,
        limit > 0 ? limit : undefined
      );
    })
  );
}
