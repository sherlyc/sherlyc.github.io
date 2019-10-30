import { isSwitchedOn } from './switch-resolver';
import { DeviceType } from '../../../common/DeviceType';
import { IFeaturesConfig } from '../__types__/IFeaturesConfig';
import * as features from '../../features.json';

export const isFeatureEnabled = async (
  feature: string,
  lotteryNumber: number,
  deviceType: DeviceType
): Promise<boolean> => {
  const featuresConfig = features as IFeaturesConfig;

  return featuresConfig.hasOwnProperty(feature)
    ? isSwitchedOn(lotteryNumber, deviceType, featuresConfig[feature])
    : false;
};
