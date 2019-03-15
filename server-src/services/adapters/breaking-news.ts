import config from '../config';
import logger from '../logger';
import axios from 'axios';
import * as pRetry from 'p-retry';
import { IRawBreakingNews } from './__types__/IRawBreakingNews';

async function apiCall(): Promise<IRawBreakingNews> {
  const response = await axios.get<IRawBreakingNews>(
    `${config.contentAPI}/breakingnews`,
    {
      validateStatus: (status: number) => {
        return status >= 200 && status < 400;
      },
      timeout: config.requestTimeout
    }
  );
  return response.data;
}

export default () => {
  return pRetry(() => apiCall(), {
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