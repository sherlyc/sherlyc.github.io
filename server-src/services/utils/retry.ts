import * as pRetry from "p-retry";
import { IParams } from "../__types__/IParams";
import config from "./config";
import logger from "./logger";

const defaultOptions = {
  retries: 2,
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
        `Attempt ${error.attemptNumber} failed. There are ${error.retriesLeft} retries left.`
      );

      if (error.retriesLeft === 0) {
        logger.error(
          params.apiRequestId,
          `Retry level error - ${error.message}`
        );
      }
    },
    ...options
  });
