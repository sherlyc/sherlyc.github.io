import { IJsonFeedArticleList } from './__types__/IJsonFeedArticleList';
import config from '../utils/config';
import retry from '../utils/retry';
import http from '../utils/http';
import { Section } from '../section';
import { URL } from 'url';
import { IParams } from '../__types__/IParams';
import { IListAsset } from './__types__/IListAsset';

async function requestArticleList(
  section: Section,
  total: number,
  params: IParams
): Promise<IJsonFeedArticleList> {
  // Adding extra query string to force retrieve new data from jsonfeed
  const url: URL = new URL(
    `${config.jsonFeedAPI}/${section}?limit=${total}&from=spade`
  );
  const response = await http(params).get<IJsonFeedArticleList>(url.href);
  return response.data;
}

export const retrieveArticleList = async (
  section: Section,
  total: number,
  params: IParams
) => retry(() => requestArticleList(section, total, params), params);

async function requestListAsset(
  params: IParams,
  listAssetId: string,
  total?: number
): Promise<IListAsset> {
  // Adding extra query string to force retrieve new data from jsonfeed
  const url: URL = new URL(
    `${config.jsonFeedAPI}/listasset/${listAssetId}?from=spade2`
  );
  const response = await http(params).get<IListAsset>(url.href);

  return total
    ? {
        ...response.data,
        assets: response.data.assets.slice(0, total)
      }
    : response.data;
}

export const retrieveListAsset = (listAssetId: string) => async (
  params: IParams,
  total: number
) => retry(() => requestListAsset(params, listAssetId, total), params);
