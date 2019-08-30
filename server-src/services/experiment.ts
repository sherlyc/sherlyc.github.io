import * as experimentsConfig from '../experimentsConfig.json';
import { DeviceType } from '../../common/DeviceType';
import {
  IExperimentsConfig,
  IExperimentVariantConfig
} from './__types__/IExperimentsConfig';

const isSelectedForVariant = (
  lotteryNumber: number,
  deviceType: DeviceType,
  variantConfig: IExperimentVariantConfig
) => {
  if (variantConfig.devices && !variantConfig.devices.includes(deviceType)) {
    return false;
  }
  if (
    lotteryNumber >= variantConfig.public.min &&
    lotteryNumber <= variantConfig.public.max
  ) {
    return true;
  }
  return variantConfig.internal === lotteryNumber;
};

export const getExperimentVariant = (
  experimentName: string,
  lotteryNumber: number,
  deviceType: DeviceType
): string => {
  const config = experimentsConfig as IExperimentsConfig;
  const experiment = config[experimentName] || {};

  const variants = Object.keys(experiment);
  const selectedVariant = variants.find((variant) =>
    isSelectedForVariant(lotteryNumber, deviceType, experiment[variant])
  );

  return selectedVariant || 'control';
};
