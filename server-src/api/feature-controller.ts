import { Request, Response } from "express";
import { isFeatureEnabled } from "../services/adapters/feature/feature";
import logger from "../services/utils/logger";
import { DeviceType } from "../../common/DeviceType";

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
    throw new Error(`Invalid feature data provided,
     featureName [${name}], lotteryNumber [${lotteryNumber}], deviceType [${deviceType}]`);
  }
}

export const featureController = function(req: Request, res: Response) {
  const {
    featureName,
    lotteryNumber,
    deviceType = DeviceType.unknown
  } = req.params;
  try {
    validateRequest(featureName, lotteryNumber, deviceType);
  } catch (error) {
    logger.info(
      req.spadeParams.apiRequestId,
      `Feature controller level error`,
      error
    );
    res.status(400).send(error.message);
    return;
  }

  try {
    const isEnabled = isFeatureEnabled(
      featureName,
      parseInt(lotteryNumber, 10),
      deviceType as DeviceType
    );
    res.send(isEnabled);
  } catch (error) {
    logger.error(
      req.spadeParams.apiRequestId,
      `Feature controller level error`,
      error
    );
    res.status(400).send(error.message);
  }
};
