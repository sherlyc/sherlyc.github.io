import { Request, Response } from 'express';
import { getExperimentVariant } from '../services/experiment';
import logger from '../services/utils/logger';
import { IParams } from '../services/__types__/IParams';

function validateRequest(name: string, lotteryNumber: number) {
  if (!name || !lotteryNumber || lotteryNumber > 100 || lotteryNumber < 0) {
    throw new Error(`Invalid experiment data provided,
     name [${name}], lotteryNumber [${lotteryNumber}]`);
  }
}

export const experimentController = function(req: Request, res: Response, params: IParams) {
  const { name, lotteryNumber } = req.query;

  try {
    validateRequest(name, lotteryNumber);
    const variant = getExperimentVariant(name, lotteryNumber);
    res.send(variant);
  } catch (e) {
    logger.error(params.apiRequestId, e.message);
    res.status(400).send(e.message);
  }
};
