import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import orchestrate from './services/orchestrator';
import extractParams from './services/params-extractor';
import * as uuidv4 from 'uuid/v4';

const app = express();

app.use(cookieParser());

app.get('/robots.txt', (req, res) => res.send(''));

app.use((req: express.Request & any, res, next) => {
  const apiRequestId = uuidv4();
  Zone.current
    .fork({
      name: 'api',
      properties: {
        apiRequestId
      }
    })
    .run(async () => {
      req.apiRequestId = apiRequestId;
      next();
    });
});

app.get('/api/content', async (req, res, next) => {
  res.json(await orchestrate(extractParams(req)));
  res.end();
});

export default app;
