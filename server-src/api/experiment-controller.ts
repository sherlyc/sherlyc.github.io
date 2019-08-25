import { Request, Response } from 'express';
import { getExperimentVariant } from '../services/experiment';
import logger from '../services/utils/logger';

function validateRequest(name: string, lotteryNumber: number) {
  if (!name || !lotteryNumber || lotteryNumber < 0) {
    throw new Error(`Invalid experiment data provided,
     name [${name}], lotteryNumber [${lotteryNumber}]`);
  }
}

export const experimentController = function(req: Request, res: Response) {
  const { experimentName, lotteryNumber } = req.params;

  try {
    validateRequest(experimentName, lotteryNumber);
    res.send(getExperimentVariant(experimentName, parseInt(lotteryNumber, 10)));
  } catch (e) {
    logger.error(
      req.spadeParams.apiRequestId,
      `Experiment controller level error - ${e.message}`
    );
    res.status(400).send(e.message);
  }
};
