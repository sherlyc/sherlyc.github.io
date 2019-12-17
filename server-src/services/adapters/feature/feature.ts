import { isSwitchedOn } from "../switch-resolver/switch-resolver";
import { DeviceType } from "../../../../common/DeviceType";
import config from "../../utils/config";
import { FeatureName } from "../../../../common/FeatureName";

export const isFeatureEnabled = async (
  feature: FeatureName | string,
  lotteryNumber: number,
  deviceType: DeviceType
): Promise<boolean> => {
  const featuresConfig = config.features;

  return featuresConfig.hasOwnProperty(feature)
    ? isSwitchedOn(
        lotteryNumber,
        deviceType,
        featuresConfig[feature as FeatureName]
      )
    : true;
};
