import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import * as express from 'express';
import apiApp from './app';

const PORT = process.env.PORT || 3000;
const server = express();

server.use(apiApp);

server.listen(PORT, () => {
  console.log(
    `API Node server listening on http://localhost:${PORT}`,
    process.env.SPADE_ENV || 'production'
  );
});
