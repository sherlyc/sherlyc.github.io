import { IExperimentsConfig } from '../__types__/IExperimentsConfig';
import { IParams } from '../__types__/IParams';
import cacheHttp from '../utils/cache-http';
import logger from '../utils/logger';
import { IFeaturesConfig } from '../__types__/IFeaturesConfig';

let lastValidConfig: IExperimentsConfig | IFeaturesConfig = {};

export const retrieveConfig = async (
  url: string,
  params: IParams
): Promise<IExperimentsConfig | IFeaturesConfig> => {
  try {
    const response = await cacheHttp(params, url);
    lastValidConfig = response.data;
    return lastValidConfig;
  } catch (error) {
    logger.error(
      params.apiRequestId,
      `SwitchesConfigRetriever - failed to load config - ${error}`
    );
    return lastValidConfig;
  }
};
