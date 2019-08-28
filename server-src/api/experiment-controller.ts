import { Request, Response } from 'express';
import { getExperimentVariant } from '../services/experiment';
import logger from '../services/utils/logger';
import { DeviceType } from '../../common/DeviceType';

function validateRequest(
  name: string,
  lotteryNumber: string,
  deviceType: string
) {
  const parsedLotto = Number(lotteryNumber);
  if (
    !name ||
    !lotteryNumber ||
    isNaN(parsedLotto) ||
    parsedLotto < 0 ||
    !Object.keys(DeviceType).includes(deviceType)
  ) {
    throw new Error(`Invalid experiment data provided,
     name [${name}], lotteryNumber [${lotteryNumber}], deviceType [${deviceType}]`);
  }
}

export const experimentController = function(req: Request, res: Response) {
  const {
    experimentName,
    lotteryNumber,
    deviceType = DeviceType.unknown
  } = req.params;
  try {
    validateRequest(experimentName, lotteryNumber, deviceType);
    res.send(
      getExperimentVariant(
        experimentName,
        parseInt(lotteryNumber, 10),
        deviceType as DeviceType
      )
    );
  } catch (e) {
    logger.error(
      req.spadeParams.apiRequestId,
      `Experiment controller level error - ${e.message}`
    );
    res.status(400).send(e.message);
  }
};
