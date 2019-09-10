import { isSwitchedOn } from './adapters/switch-resolver';
import { DeviceType } from '../../common/DeviceType';
import { retrieveConfig } from './adapters/switches-config-retriever';
import config from './utils/config';
import { IParams } from './__types__/IParams';
import { IFeaturesConfig } from './__types__/IFeaturesConfig';

export const isFeatureEnabled = async (
  feature: string,
  lotteryNumber: number,
  deviceType: DeviceType,
  params: IParams
): Promise<boolean> => {
  const featuresConfig = (await retrieveConfig(
    config.featuresConfigUrl,
    params
  )) as IFeaturesConfig;

  return featuresConfig.hasOwnProperty(feature)
    ? isSwitchedOn(lotteryNumber, deviceType, featuresConfig[feature])
    : false;
};
