import { Request, Response } from 'express';
import { getRecommendedArticles } from '../services/adapters/recommendations/recommendations.service';
import config from '../services/utils/config';

export const getHomePageRecommendations = async (
  req: Request,
  res: Response
) => {
  const cookie = req.cookies[config.recommendationsCookie];
  const ids = await getRecommendedArticles(cookie, req.spadeParams);
  res.json(ids);
};
