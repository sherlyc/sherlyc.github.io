import { IJsonFeedArticleList } from './__types__/IJsonFeedArticleList';
import config from '../utils/config';
import retry from '../utils/retry';
import http from '../utils/http';
import { Section } from '../section';
import { URL } from 'url';

async function apiCall(
  section: Section,
  total: number
): Promise<IJsonFeedArticleList> {
  const url: URL = new URL(`${config.jsonFeedAPI}/${section}?limit=${total}`);
  const response = await http.get<IJsonFeedArticleList>(url.href);
  return response.data;
}

export default (section: Section, total: number) =>
  retry(() => apiCall(section, total));
