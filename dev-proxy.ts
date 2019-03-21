import * as http from 'http';
import * as httpProxy from 'http-proxy';
import * as minimatch from 'minimatch';

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

http
  .createServer((req, res) => {
    const url = new URL('https://example.org' + req.url);

    const patternLocal = spade.find((pattern) =>
      minimatch(url.pathname || '', pattern)
    );

    const patternRemote = proxyPatterns.find((pattern) =>
      minimatch(url.pathname || '', pattern)
    );

    const target =
      patternLocal && !patternRemote
        ? 'http://localhost:4000'
        : 'https://i.stuff.co.nz';

    console.log(url.pathname, target);

    proxy.web(req, res, {
      target,
      headers: {
        host: 'i.stuff.co.nz'
      }
    });
  })
  .listen(5000);
