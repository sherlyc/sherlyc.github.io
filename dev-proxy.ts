import * as https from 'https';
import * as http from 'http';
import * as net from 'net';
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
  key: `
-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDPjG0PPHyIL68f
ZSmGiy2mx+Pwh4mviQm20rYb8sOFdD7eXU4kCh8gDVTOIkV+7LeBdFtWevr5aqUc
a8J+pHcOwAQuV9iaDbKHrLoz01L2Nuv39lYva+MB2U5tfAKWXHQCW+ASrszu+ujS
IyPNt8996SXMAO4PLO1QovYE/ZaiMpcgIEgI8wL9642eKvl7vUY802Zdvl3Rl6vL
smHI/HJzzBc0WrfY/DtTM9xwEa5qA07/5PX7tJ6WI/bmmGmT1K49R4yH2JUmZBqh
PTVzhpQUXpWEi4d8Xb3pnWnUuhiIV61+vzDpco4udwZpZMoBbqPBBRFXjyJ+RoVP
2XW1BUvnAgMBAAECggEBAJs9siV/XLaQ1DBrfpAAcnkZcslq1/XQTs/M9CIbh1u/
A3dX2ybh2z4iOpik0c6KSQgvfFJHUopU1oNXpvcLFXKW9Ymkc4NnU25gKDazjo5T
rlSekQCPdhDf9eW2qEjHho5tIkFXNjpauuLTHei14CGRzo+08luvgyKZgeNhutY+
Hmd8a2YkSCRlZui38iOgFLdN/nORtCfB/9fMaEQppYFtXxfpTL2yrvmy9Q135e3P
Pan8t5PeZUFYyexgaaRBLzdZd0ebZtSA2jCGyGa5OPNqzm2OxHwzj7I+5jAOQ2wF
VcTvSc+q54y4UWIBNNIRJ++QCdFSdkeJlO5Y6HPB5IECgYEA/yr4We/tpLzydHNm
wyVPFmhSN5OWNlAJa3OIDnprbQytvcMGkr7VUQUVaVP8zcF515p/VtBOyOqEOgS/
EwPcb3rf2x8jfWThuOTHPTUoaliKN7EAWZ5Y7SDGdUbsK+7MWtUD/EAU4UsjYcLl
QgxJfdbWd05rGwKWujMZzO3aQ1ECgYEA0DmzSg9/Pv/qT+2WWFO0BLevFqzTyIj7
JmlFwL5grJtOZHHZT8jVG9T97mr0gImCk1xRifFbTO31SKsQjytUnvksb9Tb3yq7
JSumcwDBo+RLLQwwh30CDwaN7G7yxqG6m3NpyQYXIsTe4ZKeaWvJaYJcl9B3W/hw
aZR01vCvHbcCgYBpAusgQECByozRZejFqOYKZ7ZmTuPDyF6IDQzSQIlTYKNj9A4R
eF3bsQblyP3CQ7x8AYYkWSgDQZhXNDrafX1Ll7rmt8LoSQsoB2cDhovycCu5zatC
NouMUy+5dg2d6vHI899nAYxWR5DxG78z1lCsbCzo/qnPfNpBGOSmVMC9cQKBgG2p
Zb4kaTxxpSJRGzQLaSxu3JxRivv7AGIbYSwAV4OwC1olB3DYcTvGMbHlzD0Brq4T
GbJPVWkvjVWnGgJ8rIVI71k6Pk3LAGK0GWZJyLGa4uinmctRT8tABXC2gc+Qj2md
H+JJ/ddG3abpA9q7dIjHqiIeHS5nqjRAhkRI38EDAoGACkTnkoGKRWKDyahl93Ka
sI3H0fEKAJwMel0jsJkqERbCqbUowuSWOqAXbQFDuuRgGe5kg8IISufTcfefg4E6
ANQBWdr18ICY9N0b7pqoAJ22vMekVjiAEKR9QaEeZtYksRgr6VRhGIwkwNpJ1UOR
RxAnybGz3Sm+W2LheyO86ZI=
-----END PRIVATE KEY-----
`,
  cert: `
-----BEGIN CERTIFICATE-----
MIIDmDCCAoACCQChagpRQjjBITANBgkqhkiG9w0BAQsFADCBjTELMAkGA1UEBhMC
TloxETAPBgNVBAgMCEF1Y2tsYW5kMREwDwYDVQQHDAhBdWNrbGFuZDEOMAwGA1UE
CgwFU3R1ZmYxGDAWBgNVBAsMD0V4cGVyaWVuY2UgVGVhbTEuMCwGCSqGSIb3DQEJ
ARYfcHJvZHVjdGV4cGVyaWVuY2VAc3R1ZmYuY28ubnogIDAeFw0xOTAzMjEwMjU5
MDJaFw0yOTAzMTgwMjU5MDJaMIGNMQswCQYDVQQGEwJOWjERMA8GA1UECAwIQXVj
a2xhbmQxETAPBgNVBAcMCEF1Y2tsYW5kMQ4wDAYDVQQKDAVTdHVmZjEYMBYGA1UE
CwwPRXhwZXJpZW5jZSBUZWFtMS4wLAYJKoZIhvcNAQkBFh9wcm9kdWN0ZXhwZXJp
ZW5jZUBzdHVmZi5jby5ueiAgMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKC
AQEAz4xtDzx8iC+vH2Uphostpsfj8IeJr4kJttK2G/LDhXQ+3l1OJAofIA1UziJF
fuy3gXRbVnr6+WqlHGvCfqR3DsAELlfYmg2yh6y6M9NS9jbr9/ZWL2vjAdlObXwC
llx0AlvgEq7M7vro0iMjzbfPfeklzADuDyztUKL2BP2WojKXICBICPMC/euNnir5
e71GPNNmXb5d0Zery7JhyPxyc8wXNFq32Pw7UzPccBGuagNO/+T1+7SeliP25php
k9SuPUeMh9iVJmQaoT01c4aUFF6VhIuHfF296Z1p1LoYiFetfr8w6XKOLncGaWTK
AW6jwQURV48ifkaFT9l1tQVL5wIDAQABMA0GCSqGSIb3DQEBCwUAA4IBAQAZO9FM
oYxvEKbIGV0c1O/h7Y+R3FRYR7LONIyepAaVJPo2IF3000/oewqXq+qVOt7TJGFl
ipgUSLWGMY4zb1eIo0xmSdWdWOWfT9VvJDFcfCzstBR5cz1fKCQsweKAVEEMxCoK
tcTGNgHOaP+O3LGPz41L1f2rnv8pk0LirOmjmwit0lX9kP4Dho131SYtWni33GsD
suX/F2gq6i0ibY6VY6coYEKwgN1RXD41FkaMGN+tCmgH7E3V9xlBNbDbVGGPFtlb
6NUGztrUQy0PfUIiZifmzxQ9ekscshJPRFRsL9t1lQu9aTdWqei96Lx2A46rBv/S
UOF3jFQrgDw64531
-----END CERTIFICATE-----
`
};

const HTTPS_PAYLOAD_MSB = 22;
const SOCKET_SERVER_PORT = 3000;
const PROXY_HTTPS_SERVER_PORT = 3001;
const REDIRECTION_HTTP_SERVER_PORT = 3002;

// raw socket server
net
  .createServer((conn) => {
    conn.on('error', () => {
      conn.end();
    });
    conn.once('data', (buf) => {
      const connection = net.createConnection(
        buf[0] === HTTPS_PAYLOAD_MSB
          ? PROXY_HTTPS_SERVER_PORT
          : REDIRECTION_HTTP_SERVER_PORT,
        '0.0.0.0',
        () => {
          connection.write(buf);
          conn.pipe(connection).pipe(conn);
        }
      );
    });
  })
  .listen(SOCKET_SERVER_PORT);

// http server to redirect to https
http
  .createServer((req, res) => {
    const redirect = { Location: `https://${req.headers.host}${req.url}` };
    res.writeHead(301, redirect);
    res.end();
  })
  .listen(REDIRECTION_HTTP_SERVER_PORT);

// https server to proxy SPADE and SICS / CQ
https
  .createServer(options, (req: IncomingMessage, res: ServerResponse) => {
    const url = new URL(
      `https://localhost:${PROXY_HTTPS_SERVER_PORT}${req.url}`
    );

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
  .listen(PROXY_HTTPS_SERVER_PORT);

console.log(
  `🍺 Proxy server listening on https://localhost:${PROXY_HTTPS_SERVER_PORT}`
);
