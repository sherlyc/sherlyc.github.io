import { DeviceType } from "../../../../common/DeviceType";
import { FeatureName } from "../../../../common/FeatureName";
import config from "../../utils/config";
import { IFeaturesConfig } from "../../__types__/IFeaturesConfig";
import { isSwitchedOn } from "../switch-resolver/switch-resolver";

export const isFeatureEnabled = (
  feature: FeatureName | string,
  lotteryNumber: number,
  deviceType: DeviceType
): boolean => {
  const featuresConfig: IFeaturesConfig = config.features;

  return featuresConfig.hasOwnProperty(feature)
    ? isSwitchedOn(
        lotteryNumber,
        deviceType,
        featuresConfig[feature as FeatureName]
      )
    : true;
};
