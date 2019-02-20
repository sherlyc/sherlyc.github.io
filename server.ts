import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import * as express from 'express';
import apiApp from './server-src/app';
import ngApp from './src/app';

const PORT = process.env.PORT || 4000;
const server = express();

server.use(apiApp, ngApp);

server.listen(PORT, () => {
  console.log(
    `Node server listening on http://localhost:${PORT}`,
    process.env.SPADE_ENV || 'production'
  );
});
