import { Request, Response } from 'express';
import { getExperimentVariant } from '../services/experiment';
import logger from '../services/utils/logger';
import { IParams } from '../services/__types__/IParams';

function validateRequest(name: string, lotteryNumber: number) {
  if (!name || !lotteryNumber || lotteryNumber < 0) {
    throw new Error(`Invalid experiment data provided,
     name [${name}], lotteryNumber [${lotteryNumber}]`);
  }
}

export const experimentController = function(
  req: Request,
  res: Response,
  params: IParams
) {
  const { experimentName, lotteryNumber } = req.params;

  try {
    validateRequest(experimentName, lotteryNumber);
    const variant = getExperimentVariant(
      experimentName,
      parseInt(lotteryNumber, 10)
    );
    res.send(variant);
  } catch (e) {
    logger.error(
      params.apiRequestId,
      `Experiment controller level error - ${e.message}`
    );
    res.status(400).send(e.message);
  }
};
