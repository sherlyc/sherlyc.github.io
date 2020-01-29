import orchestrate from "./orchestrator";
import logger from "./utils/logger";
import { Request, Response } from "express";

export const getContent = async (req: Request, res: Response) => {
  try {
    res.json(await orchestrate(req.spadeParams));
    res.end();
  } catch (error) {
    logger.error(req.spadeParams.apiRequestId, `Content Api Error`, error);
    res.sendStatus(500);
  }
};
