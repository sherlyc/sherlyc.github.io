/* istanbul ignore file */
import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import extractParams from './services/params-extractor';
import { IParams } from './services/__types__/IParams';
import { getWeather } from './api/weather';
import logger from './services/utils/logger';
import { experimentController } from './api/experiment-controller';
import { healthCheck } from './api/health-controller';
import { featureController } from './api/feature-controller';
import { getContent } from './services/content';

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
app.disable('x-powered-by');

app.use(cookieParser());

const spadeApiPath = '/spade/api';

app.use((req, res, next) => {
  req.spadeParams = extractParams(req);
  if (global.newrelic) {
    try {
      global.newrelic.addCustomAttribute(
        'apiRequestId',
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

app.get(`${spadeApiPath}/content`, getContent);

app.get(
  [`${spadeApiPath}/weather`, `${spadeApiPath}/weather/:location`],
  getWeather
);

app.get(
  [
    `${spadeApiPath}/experiment/:experimentName/:lotteryNumber`,
    `${spadeApiPath}/experiment/:experimentName/:lotteryNumber/:deviceType`
  ],
  experimentController
);

app.get(
  [
    `${spadeApiPath}/feature/:featureName/:lotteryNumber`,
    `${spadeApiPath}/feature/:featureName/:lotteryNumber/:deviceType`
  ],
  featureController
);

app.use('/health/:type', healthCheck);

app.use('/version', (req, res) =>
  res.send(`experience-frontend-${process.env.SPADE_VERSION || 'SNAPSHOT'}`)
);

export default app;
