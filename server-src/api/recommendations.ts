import { Request, Response } from 'express';
import cacheHttp from '../services/utils/cache-http';
import config from '../services/utils/config';

export const getHomePageRecommendations = async function(
  req: Request,
  res: Response
) {
  await cacheHttp(req.spadeParams, config.recommendationsApi);
  res.sendStatus(200);
};
