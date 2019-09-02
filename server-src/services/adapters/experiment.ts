import { DeviceType } from '../../../common/DeviceType';
import { IExperimentVariantConfig } from '../__types__/IExperimentsConfig';
import { IParams } from '../__types__/IParams';
import { retrieveExperimentsConfig } from './experiments-config-retriever';

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

export const getExperimentVariant = async (
  experimentName: string,
  lotteryNumber: number,
  deviceType: DeviceType,
  params: IParams
): Promise<string> => {
  const config = await retrieveExperimentsConfig(params);
  const experiment = config[experimentName] || {};

  const variants = Object.keys(experiment);
  const selectedVariant = variants.find((variant) =>
    isSelectedForVariant(lotteryNumber, deviceType, experiment[variant])
  );

  return selectedVariant || 'control';
};
