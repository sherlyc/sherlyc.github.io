import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import orchestrate from './services/orchestrator';
import extractParams from './services/params-extractor';
import { IParams } from './services/__types__/IParams';
import { getWeather } from './api/weather';
import logger from './services/utils/logger';
import { experimentController } from './api/experiment-controller';
import { healthCheck } from './api/health-controller';
import { featureController } from './api/feature-controller';
import { getContent } from './services/content';

const app = express();

app.use(cookieParser());

app.get('/robots.txt', (req, res) => res.send(''));

declare const global: {
  newrelic: any;
};

const spadeApiPath = '/spade/api';

const setUpNewRelicCustomAttribute = (params: IParams) => {
  if (global.newrelic) {
    try {
      global.newrelic.addCustomAttribute('apiRequestId', params.apiRequestId);
    } catch (err) {
      logger.error(params.apiRequestId, err);
    }
  }
};

app.get(`${spadeApiPath}/content`, async (req, res) => {
  const params: IParams = extractParams(req);
  setUpNewRelicCustomAttribute(params);
  await getContent(req, res, params);
});

app.get(`${spadeApiPath}/weather`, async (req, res) => {
  const params: IParams = extractParams(req);
  await getWeather(req, res, params);
});

app.get(
  `${spadeApiPath}/experiment/:experimentName/:lotteryNumber`,
  async (req, res) => {
    const params: IParams = extractParams(req);
    await experimentController(req, res, params);
  }
);

app.get(
  `${spadeApiPath}/feature/:featureName/:lotteryNumber`,
  async (req, res) => {
    const params: IParams = extractParams(req);
    await featureController(req, res, params);
  }
);

app.use('/health/:type', async (req, res) => {
  const params: IParams = extractParams(req);
  await healthCheck(req, res, params);
});

app.use('/version', (req, res) => {
  res.send(`experience-frontend-${process.env.SPADE_VERSION || 'SNAPSHOT'}`);
});

export default app;
