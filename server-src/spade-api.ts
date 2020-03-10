import * as express from "express";
import { experimentController } from "./api/experiment-controller";
import { featureController } from "./api/feature-controller";
import { getHomePageRecommendations } from "./api/recommendations";
import { getWeather } from "./api/weather";
import { versionGuard } from "./middlewares/version-guard";
import { versionParityCheck } from "./middlewares/version-parity-check";
import { getContent } from "./services/content";

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

spadeRouter.use("/:version", versionGuard, versionParityCheck, versionedRouter);

export default spadeRouter;
