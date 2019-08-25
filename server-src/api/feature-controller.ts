import { Request, Response } from 'express';
import { isFeatureEnabled } from '../services/feature';
import { FeatureName } from '../../common/FeatureName';
import logger from '../services/utils/logger';

function validateRequest(featureName: FeatureName, lotteryNumber: number) {
  if (lotteryNumber < 0) {
    throw new Error(`Invalid feature data provided,
     featureName [${featureName}], lotteryNumber [${lotteryNumber}]`);
  }
}

export const featureController = function(req: Request, res: Response) {
  const { featureName, lotteryNumber } = req.params;
  try {
    validateRequest(featureName, lotteryNumber);
    res.send(isFeatureEnabled(featureName, parseInt(lotteryNumber, 10)));
  } catch (error) {
    logger.error(
      req.spadeParams.apiRequestId,
      `Feature controller level error - ${error.message}`
    );
    res.status(400).send(error.message);
  }
};
