import { Request, Response } from "express";
import { weatherService } from "../services/adapters/weather/weather";
import logger from "../services/utils/logger";

export const getWeather = async (req: Request, res: Response) => {
  const location = req.query.location || req.params.location;
  if (location) {
    try {
      res.json(await weatherService(location, req.spadeParams));
      res.end();
    } catch (error) {
      logger.error(
        req.spadeParams.apiRequestId,
        `Weather controller level error - ${error.message}`
      );
      res.sendStatus(500);
    }
  } else {
    logger.warn(
      req.spadeParams.apiRequestId,
      `Weather controller level error - ${req.body}`
    );
    res.sendStatus(400);
  }
};
