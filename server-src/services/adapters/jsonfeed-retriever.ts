import { IJsonFeedArticleList } from './__types__/IJsonFeedArticleList';
import config from '../config';
import logger from '../logger';
import axios from 'axios';
import * as pRetry from 'p-retry';

async function apiCall(
  limit: number,
  section: string = ''
): Promise<IJsonFeedArticleList> {
  const response = await axios.get<IJsonFeedArticleList>(
    `${config.jsonFeedAPI}/${section}?limit=${limit}`,
    {
      validateStatus: (status: number) => {
        return status >= 200 && status < 400;
      },
      timeout: config.requestTimeout
    }
  );

  return response.data;
}

export default (limit: number, section?: string) => {
  return pRetry(() => apiCall(limit, section), {
    retries: 3,
    factor: 1,
    minTimeout: config.retryTimeout,
    onFailedAttempt: (error: pRetry.FailedAttemptError & any) => {
      logger.warn(
        `Attempt ${error.attemptNumber} failing when calling. There are ${
          error.retriesLeft
        } retries left.`
      );
    }
  });
};
