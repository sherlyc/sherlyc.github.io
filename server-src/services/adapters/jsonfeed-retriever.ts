import { IJsonFeedArticleList } from './__types__/IJsonFeedArticleList';
import config from '../utils/config';
import retry from '../utils/retry';
import http from '../utils/http';
import { Section } from '../section';
import { URL } from 'url';
import { IParams } from '../__types__/IParams';
import { IListAsset } from './__types__/IListAsset';

async function requestSectionArticleList(
  section: Section,
  total: number,
  params: IParams
): Promise<IJsonFeedArticleList> {
  const url: URL = new URL(
    `${config.jsonFeedAPI}/${section}?limit=${total}`
  );
  const response = await http(params).get<IJsonFeedArticleList>(url.href);
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
  const url: URL = new URL(`${config.jsonFeedAPI}/listasset/${listAssetId}`);
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
