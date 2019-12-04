import * as express from "express";
import { getContent } from "./services/content";
import { getWeather } from "./api/weather";
import { experimentController } from "./api/experiment-controller";
import { featureController } from "./api/feature-controller";
import { getHomePageRecommendations } from "./api/recommendations";
import logger from "./services/utils/logger";

const versionedRouter = express.Router();
versionedRouter.get("/content", getContent);
versionedRouter.get("/weather/:location", getWeather);
versionedRouter.get(
  "/experiment/:experimentName/:lotteryNumber/:deviceType",
  experimentController
);
versionedRouter.get(
  "/feature/:featureName/:lotteryNumber/:deviceType",
  featureController
);
versionedRouter.get("/recommendations", getHomePageRecommendations);

const spadeRouter = express.Router();
spadeRouter.get("/content", getContent);
spadeRouter.get(["/weather", "/weather/:location"], getWeather);
spadeRouter.get(
  [
    "/experiment/:experimentName/:lotteryNumber",
    "/experiment/:experimentName/:lotteryNumber/:deviceType"
  ],
  experimentController
);
spadeRouter.get(
  "/feature/:featureName/:lotteryNumber/:deviceType",
  featureController
);

spadeRouter.use(
  "/:version",
  (req, res, next) => {
    const beVersion = process.env.SPADE_VERSION || "SNAPSHOT";
    const feVersion = req.params.version || "SNAPSHOT";

    req.spadeParams.version = feVersion;

    if (beVersion !== feVersion) {
      logger.info(
        req.spadeParams.apiRequestId,
        `spade version mismatch FE:${feVersion} BE:${beVersion}`,
        {
          beVersion,
          feVersion
        }
      );
    }
    next();
  },
  versionedRouter
);

export default spadeRouter;
