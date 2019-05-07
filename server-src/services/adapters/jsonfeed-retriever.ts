import { IJsonFeedArticleList } from './__types__/IJsonFeedArticleList';
import config from '../utils/config';
import retry from '../utils/retry';
import http from '../utils/http';
import { Section } from '../section';
import { URL } from 'url';
import { IParams } from '../__types__/IParams';
import { IMidStrip } from './__types__/IMidStrip';

async function apiCall(
  section: Section,
  total: number,
  params: IParams
): Promise<IJsonFeedArticleList> {
  const url: URL = new URL(`${config.jsonFeedAPI}/${section}?limit=${total}`);
  const response = await http(params).get<IJsonFeedArticleList>(url.href);
  return response.data;
}

export default (section: Section, total: number, params: IParams) =>
  retry(() => apiCall(section, total, params), params);

export const retrieveMidStrip = async (
  total: number,
  params: IParams
): Promise<IMidStrip> => {
  const midStripPath = 'listasset/63769065';
  const url: URL = new URL(`${config.jsonFeedAPI}/${midStripPath}`);
  const response = await http(params).get<IMidStrip>(url.href);

  return {
    ...response.data,
    assets: response.data.assets.slice(0, total)
  };
};
