import { DeviceType } from '../../../common/DeviceType';
import { IParams } from '../__types__/IParams';
import { retrieveConfig } from './switches-config-retriever';
import { isSwitchedOn } from './switch-resolver';
import config from '../utils/config';
import { IExperimentsConfig } from '../__types__/IExperimentsConfig';

export const getExperimentVariant = async (
  experimentName: string,
  lotteryNumber: number,
  deviceType: DeviceType,
  params: IParams
): Promise<string> => {
  const experimentsConfig = (await retrieveConfig(
    config.experimentsConfigUrl,
    params
  )) as IExperimentsConfig;
  const experiment = experimentsConfig[experimentName] || {};

  const variants = Object.keys(experiment);
  const selectedVariant = variants.find((variant) =>
    isSwitchedOn(lotteryNumber, deviceType, experiment[variant])
  );

  return selectedVariant || 'control';
};
