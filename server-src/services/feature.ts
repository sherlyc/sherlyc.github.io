import * as featuresConfig from '../features.json';
import { IFeaturesConfig } from './__types__/IFeaturesConfig';
import { isSwitchedOn } from './adapters/switch-resolver';
import { DeviceType } from '../../common/DeviceType';

export const isFeatureEnabled = (
  feature: string,
  lotteryNumber: number,
  deviceType: DeviceType
): boolean => {
  const config = featuresConfig as IFeaturesConfig;
  const featureConfig = config[feature];

  return featureConfig
    ? isSwitchedOn(lotteryNumber, deviceType, featureConfig)
    : false;
};
