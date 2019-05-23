import { Request, Response } from 'express';
import { getExperimentVariant } from '../services/experiment';

function validateRequest(name: string, lotteryNumber: number, res: Response) {
  if ((!name && !lotteryNumber) || lotteryNumber > 100 || lotteryNumber < 0) {
    res.status(400).send(`bad experiment data provided,
     name [${name}], lotteryNumber [${lotteryNumber}]`);
  }
}

export const experimentController = function(req: Request, res: Response) {
  const { name, lotteryNumber } = req.query;
  validateRequest(name, lotteryNumber, res);

  const variant = getExperimentVariant(name, lotteryNumber);
  res.send(variant);
};
