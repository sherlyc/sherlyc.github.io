/* istanbul ignore file */
import "reflect-metadata";
import "zone.js/dist/zone-node";
import { enableProdMode } from "@angular/core";
import { ngExpressEngine } from "@nguniversal/express-engine";
import * as express from "express";
import * as cookieParser from "cookie-parser";
import { readFileSync } from "fs";
import { join } from "path";
import "source-map-support/register";
import api from "../server-src/app";
import * as helmet from "helmet";
import { requestLogger } from "../server-src/services/utils/logger";
import { cacheControl } from "./middlewares/cache-control";
// we need to this hacking so that we can set cookie in the request by
// Angular Http client, see also HttpInterceptorService and
// https://github.com/angular/angular/issues/15730
// @ts-ignore
import * as xhr2 from "xhr2";
import * as httpProxy from "http-proxy";
import { AppServerModule } from "./app/app.server.module";

xhr2.prototype._restrictedHeaders["cookie"] = false;
enableProdMode();
const app = express();

const assetsProxy = httpProxy.createServer({
  target: "https://www.stuff.co.nz",
  headers: {
    host: "www.stuff.co.nz"
  }
});

app.use(requestLogger);

app.disable("x-powered-by");
app.use(
  helmet({
    hsts: false,
    hidePoweredBy: true,
    xssFilter: false,
    frameguard: false,
    noSniff: false
  })
);

app.use(cookieParser());

app.use(
  cacheControl({
    "/spade/api/weather": "max-age=600", // 10 minutes
    "/spade/api/weather/**": "max-age=600", // 10 minutes
    "/spade/api/feature/**": "max-age=600", // 10 minutes
    "/spade/api/experiment/**": "max-age=600", // 10 minutes
    "/spade/api/*/weather": "max-age=600", // 10 minutes
    "/spade/api/*/weather/**": "max-age=600", // 10 minutes
    "/spade/api/*/feature/**": "max-age=600", // 10 minutes
    "/spade/api/*/experiment/**": "max-age=600", // 10 minutes
    "/spade/api/**": "max-age=60", // 1 minute
    "/spade/assets/icons/**": "max-age=604800", // 1 week
    "/spade/assets/fonts/**": "max-age=604800", // 1 week
    "/spade/assets/**": "max-age=86400", // 1 day
    "/spade/*.js.map": "max-age=31536000", // 1 year
    "/spade/*.js": "max-age=31536000", // 1 year
    "/spade/*.css": "max-age=31536000", // 1 year
    "/spade/signin-callback*": "max-age=300", // 5 minutes
    "/spade/manifest.webmanifest": "max-age=600", // 10 minutes
    "/spade/**": "max-age=180", // 3 minutes
    "/*.json": "max-age=180", // 3 minutes
    "/*.js": "max-age=180", // 3 minutes
    "/index.html": "max-age=180", // 3 minutes
    "/": "max-age=60", // 1 minute
    default: "max-age=60"
  })
);

app.use(api);

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), "dist");

try {
  readFileSync(join(DIST_FOLDER, "browser", "index.html"));
} catch (e) {
  console.warn(e.message);
  process.exit(1);
}

const { LAZY_MODULE_MAP } = exports;

app.engine(
  "html",
  ngExpressEngine({
    bootstrap: AppServerModule
  }) as (
    path: string,
    options: object,
    callback: (e: any, rendered: string) => void
  ) => void
);

app.set("view engine", "html");
app.set("views", join(DIST_FOLDER, "browser"));

app.get("*.*", express.static(join(DIST_FOLDER, "browser")));

app.get(["/content/*", "/robots.txt"], (req, res) => res.send(""));

app.get("/adnostic/*", (req, res) => {
  res.header("Content-Type", "application/javascript");
  return res.send("");
});

app.get(
  ["/", "/spade/signin-callback", "/spade/signin-callback-v2"],
  (req, res) =>
    res.render(join(DIST_FOLDER, "browser", "index.html"), { req, res })
);

app.get("/spade/signin-callback-v3", (req, res) => {
  res.sendFile(
    join(DIST_FOLDER, "browser", "spade/assets/signin-callback.html")
  );
});

app.get("/static/*", (req, res) => {
  assetsProxy.web(req, res);
});

app.listen(PORT, () =>
  console.log(
    `🍺 Node server listening on http://localhost:${PORT}`,
    process.env.SPADE_ENV
  )
);
