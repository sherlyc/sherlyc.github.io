import { IExperimentsConfig } from '../__types__/IExperimentsConfig';
import { IParams } from '../__types__/IParams';
import cacheHttp from '../utils/cache-http';
import config from '../utils/config';
import logger from '../utils/logger';

export const retrieveExperimentsConfig = async (
  params: IParams
): Promise<IExperimentsConfig> => {
  try {
    const response = await cacheHttp(params, config.experimentsConfigUrl);
    return response.data;
  } catch (error) {
    logger.error(
      params.apiRequestId,
      `ExperimentsConfigRetriever - failed to load config - ${error}`
    );
    return {};
  }
};
