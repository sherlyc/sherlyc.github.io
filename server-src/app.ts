import * as express from 'express';
import orchestrate from './services/orchestrator';

const app = express();

app.get('/robots.txt', (req, res) => res.send(''));

app.get('/api/content', async (req, res, next) => {
  res.json(await orchestrate());
  res.end();
});

export default app;
