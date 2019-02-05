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

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.get('/api/content', async (req, res, next) => {
  res.json(await orchestrate());
});

app.get('*.*', express.static(join(DIST_FOLDER, 'browser')));
app.get('*', (req, res) => {
  res.render('index', { req });
});

export default app;
