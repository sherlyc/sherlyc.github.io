import { Request, Response } from "express";
import orchestrate from "./orchestrator";
import config from "./utils/config";
import logger from "./utils/logger";
import { IStrapDefinition } from "./utils/__types__/IStrapDefinition";

const spadeApiContentTag = "spade-api-content";
const listAssetIds = Object.values(config.strapConfig.homepageStraps).reduce(
  (acc: string[], curr: IStrapDefinition) => acc.concat(curr.ids),
  []
);
const cdnCacheHeaders = {
  "Surrogate-Key": listAssetIds.concat(spadeApiContentTag).join(" "),
  "Edge-Cache-Tag": listAssetIds.concat(spadeApiContentTag).join(", "),
  "Edge-Control": "!no-store,cache-maxage=60"
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
