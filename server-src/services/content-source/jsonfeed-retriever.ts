import { IJsonFeedArticleList } from './__types__/IJsonFeedArticleList';
import config from '../config';
import logger from '../logger';
import axios from 'axios';
import * as pRetry from 'p-retry';
import { Section } from './section';

async function apiCall(
  section: Section,
  total: number
): Promise<IJsonFeedArticleList> {
  const response = await axios.get<IJsonFeedArticleList>(
    `${config.jsonFeedAPI}/${section}?limit=${total}`,
    {
      validateStatus: (status: number) => {
        return status >= 200 && status < 400;
      },
      timeout: config.requestTimeout
    }
  );
  return response.data;
}

export default (section: Section, total: number) => {
  return pRetry(() => apiCall(section, total), {
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
