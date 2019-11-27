import { IParams } from '../../__types__/IParams';
import { Strap } from '../../strap';
import config from '../../utils/config';
import { getListAssetById } from '../jsonfeed/jsonfeed';
import { IRawArticle } from '../__types__/IRawArticle';
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

const getBaseDedupeArticles = async (strap: Strap, params: IParams) => {
  const { baseDedupeList, homepageStraps } = config.strapConfig;
  const { dedupeFromBaseList } = homepageStraps[strap].dedupeRules;

  if (!dedupeFromBaseList) {
    return [];
  }

  const dedupeArticles = await Promise.all(
    baseDedupeList.map((strapName) => {
      const {
        ids,
        totalArticlesWithImages,
        totalTitleArticles
      } = homepageStraps[strapName];
      const limit = (totalArticlesWithImages || 0) + (totalTitleArticles || 0);
      return getArticlesInListAssets(ids, params, limit);
    })
  );
  return flatten(dedupeArticles);
};

const getExtraDedupeArticles = async (strap: Strap, params: IParams) => {
  const { extraDedupeList = [] } = config.strapConfig.homepageStraps[
    strap
  ].dedupeRules;

  const extraDedupeArticles = await Promise.all(
    extraDedupeList.map((dedupeRule) => {
      const { id, limit } = dedupeRule;
      return getArticlesInListAssets([id], params, limit);
    })
  );

  return flatten(extraDedupeArticles);
};

const getDedupeArticles = async (
  params: IParams,
  strap: Strap
): Promise<IRawArticle[]> => {
  const [baseDedupeArticles, extraDedupeArticles] = await Promise.all([
    getBaseDedupeArticles(strap, params),
    getExtraDedupeArticles(strap, params)
  ]);

  return baseDedupeArticles.concat(extraDedupeArticles);
};

export const getStrapArticles = async (
  params: IParams,
  strap: Strap,
  total?: number
): Promise<IRawArticle[]> => {
  const { ids } = config.strapConfig.homepageStraps[strap];

  const strapArticles = await getArticlesInListAssets(ids, params);
  const dedupeArticles = await getDedupeArticles(params, strap);

  return deduplicate(strapArticles, dedupeArticles).slice(0, total);
};
