import * as express from "express";
import { experimentController } from "./api/experiment-controller";
import { featureController } from "./api/feature-controller";
import { getWeather } from "./api/weather";
import { versionGuard } from "./middlewares/version-guard";
import { versionParityCheck } from "./middlewares/version-parity-check";
import { getContent } from "./services/content";
import * as httpProxy from "http-proxy";
import { createProxyMiddleware } from "http-proxy-middleware";
import config from "./services/utils/config";

const adnosticProxy = httpProxy.createServer({
  target: "https://provider.adsproduction.shift21.ffx.nz",
  headers: {
    host: "www.stuff.co.nz"
  }
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
  "/adnostic/*",
  createProxyMiddleware({
    target: config.adnosticProvider,
    changeOrigin: true,
    pathRewrite: { "^/spade/api/adnostic": "/api/v1" }
  })
);

spadeRouter.use("/:version", versionGuard, versionParityCheck, versionedRouter);

export default spadeRouter;
