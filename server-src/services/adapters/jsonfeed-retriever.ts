import { IJsonFeedArticleList } from './__types__/IJsonFeedArticleList';
import config from '../utils/config';
import retry from '../utils/retry';
import http from '../utils/http';
import { Section } from '../section';

async function apiCall(
  section: Section,
  total: number
): Promise<IJsonFeedArticleList> {
  const response = await http.get<IJsonFeedArticleList>(
    `${config.jsonFeedAPI}/${section}?limit=${total}`
  );
  return response.data;
}

export default (section: Section, total: number) => {
  return retry(() => apiCall(section, total));
};
