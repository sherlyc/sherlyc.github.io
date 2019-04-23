import * as pRetry from 'p-retry';
import config from './config';
import logger from './logger';
import { IParams } from '../__types__/IParams';

const defaultOptions = {
  retries: 3,
  factor: 1,
  minTimeout: config.retryTimeout
};

export default <T>(
  input: (attemptCount: number) => PromiseLike<T> | T,
  params: IParams,
  options: pRetry.Options = defaultOptions
): Promise<T> =>
  pRetry(input, {
    ...defaultOptions,
    onFailedAttempt: (error: pRetry.FailedAttemptError) => {
      logger.warn(
        params.apiRequestId,
        `Attempt ${error.attemptNumber} failing when calling. There are ${
          error.retriesLeft
        } retries left.`
      );
    },
    ...options
  });
