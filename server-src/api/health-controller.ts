import { IParams } from '../services/__types__/IParams';
import { Request, Response } from 'express';
import http from '../services/utils/http';
import config from '../services/utils/config';
import logger from '../services/utils/logger';

const fullHealthCheck = async (params: IParams) => {
  const jsonFeed: URL = new URL(`${config.jsonFeedAPI}?limit=1`);
  const weatherService: URL = new URL(`${config.weatherAPI}?location=Auckland`);
  const breakingNews: URL = new URL(config.breakingNewsApi);

  return Promise.all([
    http(params).get(jsonFeed.href),
    http(params).get(weatherService.href),
    http(params).get(breakingNews.href)
  ]);
};

export const healthCheck = async (
  req: Request,
  res: Response,
  params: IParams
) => {
  if (req.params.type === 'full') {
    try {
      await fullHealthCheck(params);
      res.status(200).send('Full Health Check Successful');
    } catch (err) {
      logger.error(
        params.apiRequestId,
        `Health check level error - ${err.message}`
      );
      res.sendStatus(500);
    }
  } else if (req.params.type === 'light') {
    res.status(200).send('Light Health Check Successful');
  }
};
