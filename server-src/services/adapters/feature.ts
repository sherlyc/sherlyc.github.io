import { isSwitchedOn } from './switch-resolver';
import { DeviceType } from '../../../common/DeviceType';
import config from '../utils/config';
import { IParams } from '../__types__/IParams';
import { IFeaturesConfig } from '../__types__/IFeaturesConfig';
import cacheHttp from '../utils/cache-http';
import logger from '../utils/logger';

export const isFeatureEnabled = async (
  feature: string,
  lotteryNumber: number,
  deviceType: DeviceType,
  params: IParams
): Promise<boolean> => {
  let featuresConfig;
  try {
    const response = await cacheHttp<IFeaturesConfig>(
      params,
      config.featuresConfigUrl
    );
    featuresConfig = response.data;
  } catch (error) {
    logger.error(
      params.apiRequestId,
      `FeatureConfigRetriever - failed to load config - ${error}`
    );
    featuresConfig = {};
  }

  return featuresConfig.hasOwnProperty(feature)
    ? isSwitchedOn(lotteryNumber, deviceType, featuresConfig[feature])
    : false;
};
