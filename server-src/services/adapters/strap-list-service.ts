import { IParams } from '../__types__/IParams';
import { Strap } from '../strap';
import config from '../utils/config';
import { getListAssetById } from './jsonfeed';
import { IRawArticle } from './__types__/IRawArticle';
import { flatten } from 'lodash';

const deduplicate = (
  articles: IRawArticle[],
  dedupeSource: IRawArticle[]
): IRawArticle[] => {
  const dupeSet = new Set();
  dedupeSource.forEach((article) => dupeSet.add(article.id));
  return articles.filter((asset) => !dupeSet.has(asset.id));
};

const getArticlesInListAssets = async (
  listAssetIds: string[],
  params: IParams,
  limit?: number
): Promise<IRawArticle[]> => {
  const articlesList = await Promise.all(
    listAssetIds.map((listAssetId: string) =>
      getListAssetById(params, listAssetId)
    )
  );

  return limit ? flatten(articlesList).slice(0, limit) : flatten(articlesList);
};

const dedupe = async (params: IParams, articles: IRawArticle[]) => {
  const { dedupeList, homepageStraps } = config.strapConfig;

  const dedupeArticles = await Promise.all(
    dedupeList.map((strapName) => {
      const {
        ids,
        totalArticlesWithImages,
        totalTitleArticles
      } = homepageStraps[strapName];
      const limit = (totalArticlesWithImages || 0) + (totalTitleArticles || 0);
      return getArticlesInListAssets(ids, params, limit);
    })
  );
  return deduplicate(articles, flatten(dedupeArticles));
};

export const getStrapArticles = async (
  params: IParams,
  strap: Strap,
  total?: number
): Promise<IRawArticle[]> => {
  const { ids, shouldDedupe } = config.strapConfig.homepageStraps[strap];

  const strapArticles = await getArticlesInListAssets(ids, params);
  const uniqueArticles = shouldDedupe
    ? await dedupe(params, strapArticles)
    : strapArticles;
  return uniqueArticles.slice(0, total);
};
