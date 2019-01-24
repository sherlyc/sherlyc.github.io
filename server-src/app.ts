import { enableProdMode } from '@angular/core';
import * as express from 'express';
import { join } from 'path';
// @ts-ignore
import { AppServerModuleNgFactory, LAZY_MODULE_MAP } from '../dist/server/main';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { provideModuleMap as provideModuleMapForLazyLoading } from '@nguniversal/module-map-ngfactory-loader';
import orchestrate from './services/orchestrator';

enableProdMode();
const app = express();
const DIST_FOLDER = join(process.cwd(), 'dist');

app.engine(
  'html',
  ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [provideModuleMapForLazyLoading(LAZY_MODULE_MAP)]
  })
);

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

app.get('/api/*', async (req, res, next) => {
  try {
    //TODO: handle error inside orchestrator, return error content block on error
    res.json(await orchestrate());
  } catch (e) {
    next(e);
  }
});

app.get('*.*', express.static(join(DIST_FOLDER, 'browser')));
app.get('*', (req, res) => {
  res.render('index', { req });
});

export default app;
