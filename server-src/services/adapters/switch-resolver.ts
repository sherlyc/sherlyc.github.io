import { DeviceType } from '../../../common/DeviceType';
import { ISwitchConfig } from '../__types__/ISwitchConfig';

export const isSwitchedOn = (
  lotteryNumber: number,
  deviceType: DeviceType,
  switchConfig: ISwitchConfig
): boolean => {
  if (switchConfig.devices && !switchConfig.devices.includes(deviceType)) {
    return false;
  }
  if (
    lotteryNumber >= switchConfig.public.min &&
    lotteryNumber <= switchConfig.public.max
  ) {
    return true;
  }
  return switchConfig.internal === lotteryNumber;
};
