import { Request, Response } from "express";
import orchestrate from "./orchestrator";
import config from "./utils/config";
import logger from "./utils/logger";
import { IStrapDefinition } from "./utils/__types__/IStrapDefinition";

const listAssetIds = Object.values(config.strapConfig.homepageStraps).reduce(
  (acc: string[], curr: IStrapDefinition) => acc.concat(curr.ids),
  []
);
const cdnCacheHeaders = {
  "Edge-Control": "!no-store,cache-maxage=60",
  "Surrogate-Key": listAssetIds.join(" ") + " spade-api-content",
  "Edge-Cache-Tag": listAssetIds.join(", ") + " spade-api-content"
};

export const getContent = async (req: Request, res: Response) => {
  try {
    res.set(cdnCacheHeaders);
    res.json(await orchestrate(req.spadeParams));
    res.end();
  } catch (error) {
    logger.error(req.spadeParams.apiRequestId, `Content Api Error`, error);
    res.sendStatus(500);
  }
};
