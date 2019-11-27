import { isSwitchedOn } from '../switch-resolver/switch-resolver';
import { DeviceType } from '../../../../common/DeviceType';
import { IFeaturesConfig } from '../../__types__/IFeaturesConfig';
import * as features from '../../../features.json';
import { FeatureName } from '../../../../common/FeatureName';

export const isFeatureEnabled = async (
  feature: FeatureName,
  lotteryNumber: number,
  deviceType: DeviceType
): Promise<boolean> => {
  const featuresConfig = features as IFeaturesConfig;

  return featuresConfig.hasOwnProperty(feature)
    ? isSwitchedOn(lotteryNumber, deviceType, featuresConfig[feature])
    : false;
};
