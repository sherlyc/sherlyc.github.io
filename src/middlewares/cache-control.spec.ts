import { Request, RequestHandler } from "express";
import { cacheControl } from "./cache-control";

describe("cache control", () => {
  it("should match rule", () => {
    const fakeMaxAge = "max-age=9999";
    const fakeConfig = {
      "/fake/valid": fakeMaxAge
    };
    const middleware: RequestHandler = cacheControl(fakeConfig);

    const fakeReq = {
      path: "/fake/valid"
    } as Request;

    const fakeRes: any = {
      set: jest.fn()
    };

    const fakeNext = () => {
      expect(fakeRes.set).toHaveBeenCalledWith("Cache-Control", "max-age=9999");
    };

    middleware(fakeReq, fakeRes, fakeNext);
  });

  it("should return default to default rule", () => {
    const fakeMaxAge = "max-age=9999";
    const fakeConfig = {
      "/fake/valid": "max-age=11111",
      default: fakeMaxAge
    };
    const middleware: RequestHandler = cacheControl(fakeConfig);

    const fakeReq = {
      path: "/invalid/url"
    } as Request;

    const fakeRes: any = {
      set: jest.fn()
    };

    const fakeNext = () => {
      expect(fakeRes.set).toHaveBeenCalledWith("Cache-Control", "max-age=9999");
    };

    middleware(fakeReq, fakeRes, fakeNext);
  });
});
