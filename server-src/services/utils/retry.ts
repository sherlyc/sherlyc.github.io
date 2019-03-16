import * as pRetry from 'p-retry';
import config from './config';
import logger from './logger';

const defaultOptions = {
  retries: 3,
  factor: 1,
  minTimeout: config.retryTimeout,
  onFailedAttempt: (error: pRetry.FailedAttemptError) => {
    logger.warn(
      `Attempt ${error.attemptNumber} failing when calling. There are ${
        error.retriesLeft
      } retries left.`
    );
  }
};

export default <T>(
  input: (attemptCount: number) => PromiseLike<T> | T,
  options: pRetry.Options = defaultOptions
): Promise<T> => pRetry(input, options);
