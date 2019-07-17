import { Request, Response } from 'express';
import { IParams } from '../services/__types__/IParams';
import { isFeatureEnabled } from '../services/feature';
import { FeatureNames } from '../../common/FeatureNames';
import logger from '../services/utils/logger';

function validateRequest(featureName: FeatureNames, lotteryNumber: number) {
  if (lotteryNumber < 0) {
    throw new Error(`Invalid feature data provided,
     featureName [${featureName}], lotteryNumber [${lotteryNumber}]`);
  }
}

export const featureController = function(
  req: Request,
  res: Response,
  params: IParams
) {
  const { featureName, lotteryNumber } = req.params;
  try {
    validateRequest(featureName, lotteryNumber);
    res.send(isFeatureEnabled(featureName, lotteryNumber));
  } catch (error) {
    logger.error(
      params.apiRequestId,
      `Feature controller level error - ${error.message}`
    );
    res.status(400).send(error.message);
  }
};
