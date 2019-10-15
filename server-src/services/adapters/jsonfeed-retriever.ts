import { IJsonFeedArticleList } from './__types__/IJsonFeedArticleList';
import config from '../utils/config';
import retry from '../utils/retry';
import { Section } from '../section';
import { IParams } from '../__types__/IParams';
import { IListAsset } from './__types__/IListAsset';
import cacheHttp from '../utils/cache-http';
import { IJsonFeedArticle } from './__types__/IJsonFeedArticle';

async function requestSectionArticleList(
  section: Section,
  total: number,
  params: IParams
): Promise<IJsonFeedArticleList> {
  const response = await cacheHttp(
    params,
    `${config.jsonFeedAPI}/${section}?limit=${total}`
  );
  return response.data;
}

export const retrieveSectionList = async (
  section: Section,
  total: number,
  params: IParams
) => retry(() => requestSectionArticleList(section, total, params), params);

async function requestListAsset(
  params: IParams,
  listAssetId: string,
  total?: number
): Promise<IListAsset> {
  const response = await cacheHttp(
    params,
    `${config.jsonFeedAPI}/listasset/${listAssetId}`
  );

  return total
    ? {
        ...response.data,
        assets: response.data.assets.slice(0, total)
      }
    : response.data;
}

export const retrieveListAsset = async (
  listAssetId: string,
  params: IParams,
  total: number
) => retry(() => requestListAsset(params, listAssetId, total), params);

async function requestArticle(
  params: IParams,
  articleId: string
): Promise<IJsonFeedArticle> {
  const response = await cacheHttp(
    params,
    `${config.jsonFeedAPI}/article/${articleId}`
  );
  console.log(response);
  return response.data;
}

export const retrieveArticle = async (articleId: string, params: IParams) =>
  retry(() => requestArticle(params, articleId), params);
