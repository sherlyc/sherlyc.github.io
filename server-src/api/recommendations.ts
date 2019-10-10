import { Request } from 'express';
import cacheHttp from '../services/utils/cache-http';
import config from '../services/utils/config';

export const getHomePageRecommendations = async (
  req: Request,
  res: Response
) => {
  const response = await cacheHttp(req.spadeParams, config.recommendationsApi);
};
