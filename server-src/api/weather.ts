import { Request, Response } from 'express';
import extractParams from '../services/params-extractor';
import { weatherService } from '../services/adapters/weather';

export const getWeather = async (req: Request, res: Response) => {
  const location = req.query.location;
  if (location) {
    try {
      const weatherData = await weatherService(location, extractParams());
      res.json(weatherData);
      res.end();
    } catch (error) {
      res.sendStatus(500);
    }
  } else {
    res.sendStatus(400);
  }
};
