// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { enableProdMode } from '@angular/core';
import * as express from 'express';
import { ngExpressEngine, NgSetupOptions } from '@nguniversal/express-engine';
import { MODULE_MAP } from '@nguniversal/module-map-ngfactory-loader';
import { join } from 'path';
import apiApp from 'server-src/app';

export { AppServerModule } from './src/app/app.server.module';

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

export function getNgRenderMiddlewareOptions(): NgSetupOptions {
  return {
    bootstrap: exports.AppServerModuleNgFactory,
    providers: [
      // Import module map for lazy loading
      {
        provide: MODULE_MAP,
        useFactory: () => exports.LAZY_MODULE_MAP,
        deps: []
      }
    ]
  };
}

let ngApp = createApp(getNgRenderMiddlewareOptions());

declare const module: { hot: any };

// HMR on server side
if (module.hot) {
  const hmr = () => {
    exports.AppServerModuleNgFactory = require('./src/app/app.server.module.ngfactory').AppServerModuleNgFactory;
    ngApp = createApp(getNgRenderMiddlewareOptions());
  };

  module.hot.accept('./src/app/app.server.module.ngfactory', hmr);
}

export default ngApp;

// server

const PORT = process.env.PORT || 4000;
const server = express();

server.use(apiApp, ngApp);

server.listen(PORT, () => {
  console.log(
    `Node server listening on http://localhost:${PORT}`,
    process.env.SPADE_ENV || 'production'
  );
});
