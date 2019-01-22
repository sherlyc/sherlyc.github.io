import { IJsonFeedArticleList } from '../interfaces/IJsonFeedArticleList';
import config from './config';
import logger from './logger';
import axios from 'axios';
import * as pRetry from 'p-retry';

async function apiCall(): Promise<IJsonFeedArticleList> {
  const response = await axios.get<IJsonFeedArticleList>(config.jsonFeedAPI, {
    validateStatus: (status: number) => {
      return status >= 200 && status < 400;
    },
    timeout: config.requestTimeout
  });

  return response.data;
}

export default () => {
  return pRetry(apiCall, {
    retries: 3,
    factor: 1,
    minTimeout: config.retryTimeout,
    onFailedAttempt: (error: any) => {
      logger.warn(
        `Attempt ${error.attemptNumber} failing when calling. There are ${
          error.retriesLeft
        } retries left.`
      );
    }
  });
};
