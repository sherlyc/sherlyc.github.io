import { RequestHandler } from "express";
import { parseVersion, validateVersion } from "../services/utils/version";

export const versionGuard: RequestHandler = (req, res, next) => {
  const beVersion = process.env.SPADE_VERSION || "SNAPSHOT";
  const feVersion = req.params.version || "SNAPSHOT";

  feVersion === "SNAPSHOT" ||
  beVersion === "SNAPSHOT" ||
  (validateVersion(feVersion) &&
    parseVersion(feVersion) >= parseVersion("1.300") &&
    parseVersion(feVersion) <= parseVersion(beVersion) + parseVersion("0.50"))
    ? next()
    : res.status(400).end();
};
