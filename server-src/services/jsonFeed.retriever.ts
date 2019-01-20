import { IJsonFeedArticleList } from '../interfaces/IJsonFeedArticleList';
import axios, { AxiosError } from 'axios';
import * as pRetry from 'p-retry';
import { IHttpError } from '../interfaces/HttpError';

const JSON_FEED_API = 'https://www.stuff.co.nz/_json2';

async function apiCall(): Promise<IJsonFeedArticleList> {
  const response = await axios
    .get<IJsonFeedArticleList>(JSON_FEED_API, {
      validateStatus: (status: number) => {
        return status >= 200 && status < 400;
      },
      timeout: 10 * 1000
    })
    .catch((error: AxiosError) => {
      throw error as IHttpError;
    });

  return response.data;
}

export default (withRetry: boolean = true) => {
  if (withRetry) {
    return pRetry(apiCall, { retries: 3, factor: 1 });
  }

  return apiCall();
};
