import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import orchestrate from './services/orchestrator';
import extractParams from './services/params-extractor';

const app = express();

app.use(cookieParser());

app.get('/robots.txt', (req, res) => res.send(''));

app.get('/api/content', async (req, res, next) => {
  res.json(await orchestrate(extractParams(req)));
  res.end();
});

export default app;
