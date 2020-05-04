import { Request, Response } from "express";
import orchestrate from "./orchestrator";
import { IStrapDefinition } from "./utils/__types__/IStrapDefinition";
import config from "./utils/config";
import logger from "./utils/logger";

const listAssetIds = Object.values(config.strapConfig.homepageStraps).reduce(
  (acc: string[], curr: IStrapDefinition) => acc.concat(curr.ids),
  []
);
const cdnCacheHeaders = {
  "Surrogate-Key": listAssetIds.join(" "),
  "Edge-Cache-Tag": listAssetIds.join(", ")
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
