import { enableProdMode } from '@angular/core';
import * as express from 'express';
import { join } from 'path';
import { ngExpressEngine, NgSetupOptions } from '@nguniversal/express-engine';
// @ts-ignore
import { AppServerModuleNgFactory, LAZY_MODULE_MAP } from '../dist/server/main';
import { provideModuleMap as provideModuleMapForLazyLoading } from '@nguniversal/module-map-ngfactory-loader';

enableProdMode();

export function createApp(ngSetupOptions: NgSetupOptions) {
  const app = express();
  const DIST_FOLDER = join(process.cwd(), 'dist');

  app.engine('html', ngExpressEngine(ngSetupOptions));

  app.set('view engine', 'html');
  app.set('views', join(DIST_FOLDER, 'browser'));

  app.get('*.*', express.static(join(DIST_FOLDER, 'browser')));
  app.get('*', (req, res) => {
    res.render('index', { req });
  });
  return app;
}

export default createApp({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    // Import module map for lazy loading
    provideModuleMapForLazyLoading(LAZY_MODULE_MAP)
  ]
});
