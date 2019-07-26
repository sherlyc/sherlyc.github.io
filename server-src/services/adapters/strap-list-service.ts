import { IParams } from '../__types__/IParams';
import { Strap } from '../strap';
import config from '../utils/config';
import { getListAssetById } from './jsonfeed';
import { IRawArticle } from './__types__/IRawArticle';
import { flatten } from 'lodash';

export const saveStrapArticlesToCache = (
  params: IParams,
  strap: Strap,
  strapLoadedPromise: Promise<IRawArticle[]>
) => {
  if (!params.strapArticlesCache) {
    params.strapArticlesCache = {};
  }
  params.strapArticlesCache![strap] = strapLoadedPromise;
};

export const getStrapArticlesFromCache = (
  params: IParams,
  strap: Strap
): Promise<IRawArticle[]> | undefined => {
  const { strapArticlesCache } = params;

  return strapArticlesCache && strapArticlesCache[strap]
    ? strapArticlesCache[strap]
    : undefined;
};

function deduplicate(
  articles: IRawArticle[],
  dedupeSource: IRawArticle[]
): IRawArticle[] {
  const dupeSet = new Set();

  dedupeSource.forEach((article) => dupeSet.add(article.id));

  return articles.filter((asset) => !dupeSet.has(asset.id));
}

function getDeduplicationLists(params: IParams, strap: Strap) {
  const hasDedupe = config.strapConfig.homepageStraps[strap].toDedupe;
  const deduplicateSources = config.strapConfig.dedupeList;

  if (hasDedupe && deduplicateSources) {
    return Promise.all(
      deduplicateSources.map((strapToDedupeFrom) => {
        const dedupeFrom = config.strapConfig.homepageStraps[strapToDedupeFrom];
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
  return Promise.resolve([[]]);
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

  let resolveStrapCachedPromise: Function = () => {};
  saveStrapArticlesToCache(
    params,
    strap,
    new Promise((resolve) => (resolveStrapCachedPromise = resolve))
  );

  const strapArticlesIds = config.strapConfig.homepageStraps[strap].ids;

  const strapArticlesPromise = Promise.all(
    strapArticlesIds.map((listAssetId) => getListAssetById(params, listAssetId))
  );

  const dedupeSourcePromise = getDeduplicationLists(params, strap);

  const [nestedStrapArticles, nestedDedupeSource] = await Promise.all([
    strapArticlesPromise,
    dedupeSourcePromise
  ]);
  const strapArticles = flatten(nestedStrapArticles);
  const deduplicationSource = flatten(nestedDedupeSource);

  const strapResult = deduplicate(strapArticles, deduplicationSource).slice(
    0,
    total
  );

  resolveStrapCachedPromise(strapResult);
  return strapResult;
};
