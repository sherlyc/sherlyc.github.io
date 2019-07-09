/**
 * Browser stack add-on to speed up tests
 * https://github.com/browserstack/fast-selenium-scripts/blob/master/node/fast-selenium.js
 */
import * as http from 'http';
import * as https from 'https';

const keepAliveTimeout = 30 * 1000;

if (http.globalAgent && http.globalAgent.hasOwnProperty('keepAlive')) {
  // @ts-ignore
  http.globalAgent.keepAlive = true;
  // @ts-ignore
  https.globalAgent.keepAlive = true;
  // @ts-ignore
  http.globalAgent.keepAliveMsecs = keepAliveTimeout;
  // @ts-ignore
  https.globalAgent.keepAliveMsecs = keepAliveTimeout;
} else {
  const agent = new http.Agent({
    keepAlive: true,
    keepAliveMsecs: keepAliveTimeout
  });

  const secureAgent = new https.Agent({
    keepAlive: true,
    keepAliveMsecs: keepAliveTimeout
  });

  const httpRequest = http.request;
  const httpsRequest = https.request;

  // @ts-ignore
  http.request = function(
    options: https.RequestOptions,
    callback: (res: http.IncomingMessage) => void
  ) {
    if (options.protocol === 'https:') {
      options['agent'] = secureAgent;
      return httpsRequest(options, callback);
    } else {
      options['agent'] = agent;
      return httpRequest(options, callback);
    }
  };
}
