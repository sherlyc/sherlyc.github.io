import { Request, Response } from "express";
import { getExperimentVariant } from "../services/adapters/experiment/experiment";
import logger from "../services/utils/logger";
import { DeviceType } from "../../common/DeviceType";
import { ExperimentName } from "../../common/ExperimentName";

function validateRequest(
  name: string,
  lotteryNumber: string,
  deviceType: string
) {
  const parsedLotto = Number(lotteryNumber);
  if (
    isNaN(parsedLotto) ||
    parsedLotto <= 0 ||
    !Object.keys(DeviceType).includes(deviceType)
  ) {
    throw new Error(`Invalid experiment data provided,
     name [${name}], lotteryNumber [${lotteryNumber}], deviceType [${deviceType}]`);
  }
}

export const experimentController = async function(
  req: Request,
  res: Response
) {
  const {
    experimentName,
    lotteryNumber,
    deviceType = DeviceType.unknown
  } = req.params;

  try {
    validateRequest(experimentName, lotteryNumber, deviceType);
  } catch (error) {
    logger.info(
      req.spadeParams.apiRequestId,
      `Experiment controller level error`,
      error
    );
    res.status(400).send(error.message);
    return;
  }

  try {
    const variant = await getExperimentVariant(
      experimentName as ExperimentName,
      parseInt(lotteryNumber, 10),
      deviceType as DeviceType,
      req.spadeParams
    );
    res.send(variant);
  } catch (error) {
    logger.error(
      req.spadeParams.apiRequestId,
      `Experiment controller level error`,
      error
    );
    res.status(400).send(error.message);
  }
};
