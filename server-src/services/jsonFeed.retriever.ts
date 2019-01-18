import { IJsonFeedArticleList } from '../interfaces/IJsonFeedArticleList';
import axios from 'axios';
import * as pRetry from 'p-retry';

const JSON_FEED_API = 'https://www.stuff.co.nz/_json2';

async function apiCall(): Promise<IJsonFeedArticleList> {
  const response = await axios.get<IJsonFeedArticleList>(JSON_FEED_API, {
    timeout: 10 * 1000
  });
  if (response.status >= 400) {
    throw new Error(String(response.status));
  }
  return response.data;
}

export default () => pRetry(apiCall, { retries: 3, factor: 1 });
