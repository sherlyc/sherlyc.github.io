import * as handlerRunner from "./handlers/runner";
import { HandlerInputType } from "./handlers/__types__/HandlerInputType";
import orchestrator from "./orchestrator";
import { pageV0 } from "./pages/page-v0";
import { pageV1 } from "./pages/page-v1";
import { pageV2 } from "./pages/page-v2";
import { IParams } from "./__types__/IParams";

jest.mock("./handlers/runner");

describe("Orchestrator", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should log and throw error when content block throws error", async () => {
    const error = new Error("content block failed");
    (handlerRunner.default as jest.Mock).mockRejectedValue(error);
    await expect(orchestrator({ apiRequestId: "123" })).rejects.toEqual(error);
  });

  it("should return page v0 for old frontend version", async () => {
    const params: IParams = {
      version: "1.648",
      apiRequestId: "123"
    };

    (handlerRunner.default as jest.Mock).mockResolvedValue([]);

    await orchestrator(params);

    expect(handlerRunner.default).toHaveBeenCalledWith(
      {
        type: HandlerInputType.Page,
        items: [
          {
            type: HandlerInputType.ForceUpdate,
            forceUpdateOnVersionsBefore: expect.any(String)
          },
          ...pageV0()
        ]
      },
      params
    );
  });

  it.each([["1.649"], ["1.880"]])(
    "should return page v1 when frontend version is %s",
    async (version: string) => {
      const params: IParams = {
        version,
        apiRequestId: "123"
      };

      (handlerRunner.default as jest.Mock).mockResolvedValue([]);

      await orchestrator(params);

      expect(handlerRunner.default).toHaveBeenCalledWith(
        {
          type: HandlerInputType.Page,
          items: [
            {
              type: HandlerInputType.ForceUpdate,
              forceUpdateOnVersionsBefore: expect.any(String)
            },
            ...pageV1()
          ]
        },
        params
      );
    }
  );

  it("should return new page with feature switch between page v2 and v1 for new front end version", async () => {
    const params: IParams = {
      version: "1.881",
      apiRequestId: "123"
    };

    (handlerRunner.default as jest.Mock).mockResolvedValue([]);

    await orchestrator(params);

    expect(handlerRunner.default).toHaveBeenCalledWith(
      {
        type: HandlerInputType.Page,
        items: [
          {
            type: HandlerInputType.ForceUpdate,
            forceUpdateOnVersionsBefore: expect.any(String)
          },
          ...pageV2()
        ]
      },
      params
    );
  });
});
