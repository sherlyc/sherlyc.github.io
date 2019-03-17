import { IJsonFeedArticleList } from './__types__/IJsonFeedArticleList';
import config from '../utils/config';
import retry from '../utils/retry';
import http from '../utils/http';
import { Section } from '../section';

async function apiCall(url: URL): Promise<IJsonFeedArticleList> {
  const response = await http.get<IJsonFeedArticleList>(url.href);
  return response.data;
}

export default (section: Section, total: number) => {
  const url: URL = new URL(`${config.jsonFeedAPI}/${section}?limit=${total}`);
  return retry(() => apiCall(url));
};
