import { IJsonFeedArticleList } from './__types__/IJsonFeedArticleList';
import config from '../utils/config';
import retry from '../utils/retry';
import http from '../utils/http';
import { Section } from '../section';
import { URL } from 'url';
import { IParams } from '../__types__/IParams';
import { IMidStrip } from './__types__/IMidStrip';

async function requestArticleList(
  section: Section,
  total: number,
  params: IParams
): Promise<IJsonFeedArticleList> {
  const url: URL = new URL(`${config.jsonFeedAPI}/${section}?limit=${total}`);
  const response = await http(params).get<IJsonFeedArticleList>(url.href);
  return response.data;
}

export const retrieveArticleList = async (
  section: Section,
  total: number,
  params: IParams
) => retry(() => requestArticleList(section, total, params), params);

async function requestMidStrip(
  total: number,
  params: IParams
): Promise<IMidStrip> {
  const url: URL = new URL(
    `${config.jsonFeedAPI}/listasset/${config.midStripListAssetId}`
  );
  const response = await http(params).get<IMidStrip>(url.href);

  return {
    ...response.data,
    assets: response.data.assets.slice(0, total)
  };
}

export const retrieveMidStrip = async (total: number, params: IParams) =>
  retry(() => requestMidStrip(total, params), params);

async function requestMiniMidStrip(params: IParams): Promise<IMidStrip> {
  const url: URL = new URL(
    `${config.jsonFeedAPI}/listasset/${config.miniMidStripListAssetId}`
  );
  const response = await http(params).get<IMidStrip>(url.href);

  return response.data;
}

export const retrieveMiniMidStrip = async (params: IParams) =>
  retry(() => requestMiniMidStrip(params), params);
