import { DeviceType } from "../../../../common/DeviceType";
import { IParams } from "../../__types__/IParams";
import { isSwitchedOn } from "../switch-resolver/switch-resolver";
import { IExperimentsConfig } from "../../__types__/IExperimentsConfig";
import * as experimentJson from "../../../experimentsConfig/experiments-prod.json";
import { ExperimentName } from "../../../../common/ExperimentName";

export const getExperimentVariant = async (
  experimentName: ExperimentName,
  lotteryNumber: number,
  deviceType: DeviceType,
  params: IParams
): Promise<string> => {
  const config = experimentJson as IExperimentsConfig;
  const experiment = config[experimentName] || {};

  const variants = Object.keys(experiment);
  const selectedVariant = variants.find((variant) =>
    isSwitchedOn(lotteryNumber, deviceType, experiment[variant])
  );

  return selectedVariant || "control";
};
