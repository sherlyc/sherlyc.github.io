import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import orchestrate from './services/orchestrator';
import extractParams from './services/params-extractor';
import { IParams } from './services/__types__/IParams';
import { getWeather } from './api/weather';
import logger from './services/utils/logger';

const app = express();

app.use(cookieParser());

app.get('/robots.txt', (req, res) => res.send(''));

declare const global: {
  newrelic: any;
};

app.get('/spade/api/content', async (req, res, next) => {
  const params: IParams = extractParams(req);
  if (global.newrelic) {
    try {
      global.newrelic.addCustomAttribute('apiRequestId', params.apiRequestId);
    } catch (err) {
      logger.error(params.apiRequestId, err);
    }
  }
  res.json(await orchestrate(params));
  res.end();
});

app.get('/spade/api/weather', getWeather);

export default app;
