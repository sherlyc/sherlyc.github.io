import { isSwitchedOn } from "../switch-resolver/switch-resolver";
import { DeviceType } from "../../../../common/DeviceType";
import config from "../../utils/config";
import { FeatureName } from "../../../../common/FeatureName";
import { IFeaturesConfig } from "../../__types__/IFeaturesConfig";

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
