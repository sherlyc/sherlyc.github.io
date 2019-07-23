import orchestrate from './orchestrator';
import logger from './utils/logger';
import { IParams } from './__types__/IParams';
import { Request, Response } from 'express';

export const getContent = async (
  req: Request,
  res: Response,
  params: IParams
) => {
  try {
    res.json(await orchestrate(params));
    res.end();
  } catch (e) {
    logger.error(params.apiRequestId, `Content Api Error - ${e}`);
    res.sendStatus(500);
  }
};
