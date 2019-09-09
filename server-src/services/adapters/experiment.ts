import { DeviceType } from '../../../common/DeviceType';
import { IParams } from '../__types__/IParams';
import { retrieveExperimentsConfig } from './experiments-config-retriever';
import { isSwitchedOn } from './switch-resolver';

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
    isSwitchedOn(lotteryNumber, deviceType, experiment[variant])
  );

  return selectedVariant || 'control';
};
