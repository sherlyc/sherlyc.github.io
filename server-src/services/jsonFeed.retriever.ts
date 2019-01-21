import { IJsonFeedArticleList } from '../interfaces/IJsonFeedArticleList';
import config from './config';
import { FailedAttemptError } from 'p-retry';
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
    onFailedAttempt: (error: FailedAttemptError) => {
      console.warn(
        `Attempt ${error.attemptNumber} failing when calling. There are ${
          error.attemptsLeft
        } retries left.`
      );
    }
  });
};
