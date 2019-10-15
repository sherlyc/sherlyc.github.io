import * as express from 'express';
import { getContent } from './services/content';
import { getWeather } from './api/weather';
import { experimentController } from './api/experiment-controller';
import { featureController } from './api/feature-controller';
import { getHomePageRecommendations } from './api/recommendations';

const versionedRouter = express.Router();
versionedRouter.get('/content', getContent);
versionedRouter.get('/weather/:location', getWeather);
versionedRouter.get(
  '/experiment/:experimentName/:lotteryNumber/:deviceType',
  experimentController
);
versionedRouter.get(
  '/feature/:featureName/:lotteryNumber/:deviceType',
  featureController
);

const spadeRouter = express.Router();
spadeRouter.get('/content', getContent);
spadeRouter.get(['/weather', '/weather/:location'], getWeather);
spadeRouter.get(
  [
    '/experiment/:experimentName/:lotteryNumber',
    '/experiment/:experimentName/:lotteryNumber/:deviceType'
  ],
  experimentController
);
spadeRouter.get(
  [
    '/feature/:featureName/:lotteryNumber',
    '/feature/:featureName/:lotteryNumber/:deviceType'
  ],
  featureController
);
spadeRouter.get('/recommendations', getHomePageRecommendations);

spadeRouter.use(
  '/:version',
  (req, res, next) => {
    req.spadeParams.version = req.params.version;
    next();
  },
  versionedRouter
);

export default spadeRouter;
