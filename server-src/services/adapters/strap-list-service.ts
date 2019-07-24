import { IParams } from '../__types__/IParams';
import { Strap } from '../strap';
import config from '../utils/config';
import { getListAssetById } from './jsonfeed';
import { IRawArticle } from './__types__/IRawArticle';
import { flatten } from 'lodash';

const getStrapArticlesFromCache = (
  params: IParams,
  strap: Strap
): IRawArticle[] | undefined => {
  const { cache } = params;

  return cache && strap in cache ? cache[strap] : undefined;
};

const saveStrapArticlesToCache = (
  params: IParams,
  strap: Strap,
  strapResult: IRawArticle[]
) => {
  if (!params.cache) {
    params.cache = {};
  }
  params.cache[strap] = strapResult;
};

function deduplicate(
  articles: IRawArticle[],
  dedupeSource: IRawArticle[]
): IRawArticle[] {
  const dupeSet = new Set();

  dedupeSource.forEach((article) => dupeSet.add(article.id));

  return articles.filter((asset) => !dupeSet.has(asset.id));
}

export const getStrapArticles = async (
  params: IParams,
  strap: Strap,
  total?: number
): Promise<IRawArticle[]> => {
  const cachedStrapArticles = getStrapArticlesFromCache(params, strap);

  if (cachedStrapArticles) {
    return cachedStrapArticles;
  }

  const strapArticlesIds = config.strapConfig!.homepageStraps[strap].ids;

  const strapArticlesPromise = Promise.all(
    strapArticlesIds.map((listAssetId) => getListAssetById(params, listAssetId))
  );

  let dedupeSourcePromise: Promise<IRawArticle[][]> = Promise.resolve([[]]);

  const hasDedupe = config.strapConfig!.homepageStraps[strap].toDedupe;
  const deduplicateSources = config.strapConfig!.dedupeList;

  if (hasDedupe && deduplicateSources) {
    dedupeSourcePromise = getDeduplicationLists(params, deduplicateSources);
  }

  const [nestedStrapArticles, nestedDedupeSource] = await Promise.all([
    strapArticlesPromise,
    dedupeSourcePromise
  ]);
  const articles = flatten(nestedStrapArticles);
  const deduplicationSource = flatten(nestedDedupeSource);

  const strapResult = deduplicate(articles, deduplicationSource).slice(
    0,
    total
  );
  saveStrapArticlesToCache(params, strap, strapResult);

  return strapResult;
};

function getDeduplicationLists(params: IParams, strapNames: Strap[]) {
  return Promise.all(
    strapNames.map((strapToDedupeFrom) => {
      const dedupeFrom = config.strapConfig!.homepageStraps[strapToDedupeFrom];
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
