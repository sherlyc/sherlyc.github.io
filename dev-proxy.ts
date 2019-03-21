import * as https from 'https';
import * as fs from 'fs';
import { URL } from 'url';
import * as httpProxy from 'http-proxy';
import * as minimatch from 'minimatch';
import { IncomingMessage, ServerResponse } from 'http';

const proxy = httpProxy.createServer();

const spade = [
  '/',
  '/assets/**',
  '/*.js',
  '/*.css',
  '/*.map',
  '/*.ico',
  '/manifest.webmanifest',
  '/ngsw.json*'
];

const proxyPatterns = ['/sics-assets/**', '/static/**'];

const options: https.ServerOptions = {
  key: fs.readFileSync('privateKey.key'),
  cert: fs.readFileSync('certificate.crt')
};

const port = 4443;

https
  .createServer(options, (req: IncomingMessage, res: ServerResponse) => {
    const path = req.url;

    const patternLocal = spade.find((pattern) =>
      minimatch(path || '', pattern)
    );

    const patternRemote = proxyPatterns.find((pattern) =>
      minimatch(path || '', pattern)
    );

    const target =
      patternLocal && !patternRemote
        ? 'http://localhost:4000'
        : 'https://i.stuff.co.nz';

    console.log(path, target);

    proxy.web(req, res, {
      target,
      headers: {
        host: 'i.stuff.co.nz'
      }
    });
  })
  .listen(port);

console.log(`Listen on https://localhost:${port}`);
