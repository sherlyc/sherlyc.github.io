import { Request, Response } from 'express';
import { getRecommendedArticles } from '../services/adapters/recommendations/recommendations.service';

export const getHomePageRecommendations = async (
  req: Request,
  res: Response
) => {
  const articles = await getRecommendedArticles(
    req.params.segments,
    req.spadeParams
  );
  res.json(articles);
};
