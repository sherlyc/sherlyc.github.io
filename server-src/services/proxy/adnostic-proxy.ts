import { createProxyMiddleware } from "http-proxy-middleware";
import config from "../utils/config";

export const adnosticProxy = () =>
  createProxyMiddleware({
    target: config.adnosticProvider,
    changeOrigin: true,
    pathRewrite: { "^/spade/api/adnostic": "/api/v1" }
  });
