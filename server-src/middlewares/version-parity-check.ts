import { RequestHandler } from "express";
import logger from "../services/utils/logger";
import { parseVersion } from "../services/utils/version";

export const versionParityCheck: RequestHandler = (req, res, next) => {
  const beVersion = process.env.SPADE_VERSION || "SNAPSHOT";
  const feVersion = req.params.version || "SNAPSHOT";

  req.spadeParams.version = feVersion;

  if (beVersion !== feVersion) {
    if (
      parseVersion(beVersion) - parseVersion(feVersion) >
      parseVersion("0.1")
    ) {
      logger.info(
        req.spadeParams.apiRequestId,
        `spade version mismatch FE:${feVersion} BE:${beVersion}`,
        {
          beVersion,
          feVersion
        }
      );
    }
  }
  next();
};
