import * as express from 'express';
import orchestrate from './services/orchestrator';

export function createApp() {
  const app = express();

  app.get('/api/content', async (req, res, next) => {
    res.json(await orchestrate());
  });

  return app;
}

export default createApp();
