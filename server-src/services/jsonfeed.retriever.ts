import { IJsonFeedArticleList } from '../interfaces/IJsonFeedArticleList';
import axios from 'axios';

const JSON_FEED_API = 'https://www.stuff.co.nz/_json2';

export default async (): Promise<IJsonFeedArticleList> => {
  const response = await axios.get<IJsonFeedArticleList>(JSON_FEED_API);
  if (response.status >= 400) {
    throw new Error(String(response.status));
  }
  return response.data;
};
