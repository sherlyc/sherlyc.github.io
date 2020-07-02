import { Request } from "express";
import { getContent } from "./content";
import * as orchestrate from "./orchestrator";

jest.mock("./utils/config", () => ({
  default: {
    strapConfig: {
      homepageStraps: {
        strapTopStories: {
          ids: ["42", "43"]
        }
      }
    },
    loggerOptions: {
      level: "debug",
      format: "text"
    }
  }
}));

describe("Content Controller", () => {
  it("should send 500 status when orchestrator throws error", async () => {
    const req = { spadeParams: {} } as Request;
    const res = {
      set: jest.fn(),
      json: jest.fn(),
      sendStatus: jest.fn()
    } as any;
    jest.spyOn(orchestrate, "default").mockRejectedValue(new Error());

    await getContent(req, res);

    expect(res.sendStatus).toHaveBeenCalledWith(500);
  });

  it("should return result and end request when orchestrator successfully returns", async () => {
    const req = { spadeParams: {} } as Request;
    const res = { set: jest.fn(), json: jest.fn(), end: jest.fn() } as any;

    const result = {
      apiRequestId: "123",
      title: "Title",
      version: "",
      content: []
    };
    jest.spyOn(orchestrate, "default").mockResolvedValue(result);

    await getContent(req, res);

    expect(res.json).toHaveBeenCalledWith(result);
    expect(res.set).toHaveBeenCalledWith({
      "Surrogate-Key": "42 43 spade-api-content",
      "Edge-Cache-Tag": "42, 43, spade-api-content",
      "Edge-Control": "!no-store,cache-maxage=60"
    });
    expect(res.end).toHaveBeenCalled();
  });
});
