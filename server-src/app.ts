/* istanbul ignore file */
import * as cookieParser from "cookie-parser";
import * as express from "express";
import { healthCheck } from "./api/health-controller";
import { IParams } from "./services/__types__/IParams";
import extractParams from "./services/params-extractor";
import logger from "./services/utils/logger";
import spadeApi from "./spade-api";

declare const global: {
  newrelic: any;
};

declare global {
  namespace Express {
    // tslint:disable-next-line:interface-name
    export interface Request {
      spadeParams: IParams;
    }
  }
}

const app = express();
app.disable("x-powered-by");

app.use(cookieParser());

app.use((req, res, next) => {
  req.spadeParams = extractParams(req);
  if (global.newrelic) {
    try {
      global.newrelic.addCustomAttribute(
        "apiRequestId",
        req.spadeParams.apiRequestId
      );
    } catch (err) {
      logger.error(
        req.spadeParams.apiRequestId,
        `App - failed to set NewRelic custom attribute - ${err}`
      );
    }
  }
  next();
});

app.use("/spade/api", spadeApi);

app.use("/health/:type", healthCheck);

app.use("/version", (req, res) =>
  res.send(`experience-frontend-${process.env.SPADE_VERSION || "SNAPSHOT"}`)
);

export default app;
