import * as express from "express";
import { experimentController } from "./api/experiment-controller";
import { featureController } from "./api/feature-controller";
import { getWeather } from "./api/weather";
import { versionGuard } from "./middlewares/version-guard";
import { versionParityCheck } from "./middlewares/version-parity-check";
import { getContent } from "./services/content";
import { createProxyMiddleware } from "http-proxy-middleware";
import config from "./services/utils/config";

const adnosticProxy = (adnosticProxyPath: string) =>
  createProxyMiddleware({
    target: config.adnosticProvider,
    changeOrigin: true,
    pathRewrite: { [adnosticProxyPath]: "/api/v1" }
  });

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

versionedRouter.use(
  "/adnostic/*",
  adnosticProxy("^/spade/api/\\d+.\\d+/adnostic")
);

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

spadeRouter.use("/adnostic/*", adnosticProxy("^/spade/api/adnostic"));

spadeRouter.use("/:version", versionGuard, versionParityCheck, versionedRouter);

export default spadeRouter;
