import { Request, Response } from 'express';
import extractParams from '../services/params-extractor';
import { weatherService } from '../services/adapters/weather';
import logger from '../services/utils/logger';
import { IParams } from '../services/__types__/IParams';

export const getWeather = async (req: Request, res: Response, params: IParams ) => {
  const location = req.query.location;
  if (location) {
    try {
      const weatherData = await weatherService(location, extractParams());
      res.json(weatherData);
      res.end();
    } catch (error) {
      logger.error(params.apiRequestId, error.message);
      res.sendStatus(500);
    }
  } else {
    logger.warn(params.apiRequestId, '400 error on backend Weather service');
    res.sendStatus(400);
  }
};
