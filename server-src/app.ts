import * as express from 'express';
import orchestrate from './services/orchestrator';

const app = express();

app.get('/api/content', async (req, res, next) => {
  res.json(await orchestrate());
});

export default app;
