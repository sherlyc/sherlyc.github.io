import { Request, Response } from 'express';
import { getExperimentVariant } from '../services/experiment';

function validateRequest(name: string, lotteryNumber: number) {
  if (!name || !lotteryNumber || lotteryNumber > 100 || lotteryNumber < 0) {
    throw new Error(`Invalid experiment data provided,
     name [${name}], lotteryNumber [${lotteryNumber}]`);
  }
}

export const experimentController = function(req: Request, res: Response) {
  const { name, lotteryNumber } = req.query;

  try {
    validateRequest(name, lotteryNumber);
    const variant = getExperimentVariant(name, lotteryNumber);
    res.send(variant);
  } catch (e) {
    res.status(400).send(e.message);
  }
};
