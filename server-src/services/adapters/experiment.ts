import { DeviceType } from '../../../common/DeviceType';
import { IParams } from '../__types__/IParams';
import { isSwitchedOn } from './switch-resolver';
import config from '../utils/config';
import { IExperimentsConfig } from '../__types__/IExperimentsConfig';
import cacheHttp from '../utils/cache-http';
import logger from '../utils/logger';

let lastValidConfig: IExperimentsConfig = {};

export const getExperimentVariant = async (
  experimentName: string,
  lotteryNumber: number,
  deviceType: DeviceType,
  params: IParams
): Promise<string> => {
  try {
    const response = await cacheHttp<IExperimentsConfig>(
      params,
      config.experimentsConfigUrl
    );
    lastValidConfig = response.data;
  } catch (error) {
    logger.error(
      params.apiRequestId,
      `ExperimentConfigRetriever - failed to load config - ${error}`
    );
  }

  const experiment = lastValidConfig[experimentName] || {};

  const variants = Object.keys(experiment);
  const selectedVariant = variants.find((variant) =>
    isSwitchedOn(lotteryNumber, deviceType, experiment[variant])
  );

  return selectedVariant || 'control';
};
