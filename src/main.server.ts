// These are important and needed before anything else
import 'reflect-metadata';
import 'zone.js/dist/zone-node';

import { enableProdMode } from '@angular/core';
import { renderModuleFactory } from '@angular/platform-server';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

import * as express from 'express';
import * as cors from 'cors';
import { readFileSync } from 'fs';
import { join } from 'path';
import 'source-map-support/register';
import api from '../server-src/app';

export { AppServerModule } from './app/app.server.module';

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();
app.use(cors());

app.use(api);

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist');

let template: string;
try {
  // Our index.html we'll use as our template
  template = readFileSync(
    join(DIST_FOLDER, 'browser', 'index.html')
  ).toString();
} catch (e) {
  // normally this only happens in development
  console.warn(e.message);
  process.exit(1);
}

const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = exports;

// @ts-ignore
app.engine('html', (_, options, callback) => {
  renderModuleFactory(AppServerModuleNgFactory, {
    // Our index.html
    document: template,
    url: options.req.url,
    // DI so that we can get lazy-loading to work differently (since we need it to just instantly render it)
    extraProviders: [provideModuleMap(LAZY_MODULE_MAP)]
  }).then((html) => {
    callback(null, html);
  });
});

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER, 'browser')));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render(join(DIST_FOLDER, 'browser', 'index.html'), { req });
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(
    `Node server listening on http://localhost:${PORT}`,
    process.env.SPADE_ENV
  );
});
