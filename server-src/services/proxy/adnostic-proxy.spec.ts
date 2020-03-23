import { adnosticProxy } from "./adnostic-proxy";
import { createProxyMiddleware } from "http-proxy-middleware";
import config from "../utils/config";

jest.mock("http-proxy-middleware");

describe("Adnostic Proxy", () => {
  it("should configure proxy middleware", () => {
    adnosticProxy();

    expect(createProxyMiddleware).toHaveBeenCalledTimes(1);
    expect(createProxyMiddleware).toHaveBeenCalledWith({
      target: config.adnosticProvider,
      changeOrigin: true,
      pathRewrite: { "^/spade/api/adnostic": "/api/v1" }
    });
  });
});
