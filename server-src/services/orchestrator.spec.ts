import { IParams } from "./__types__/IParams";
import { HandlerInputType } from "./handlers/__types__/HandlerInputType";
import * as handlerRunner from "./handlers/runner";
import orchestrator, { newPage, oldPage } from "./orchestrator";

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

  it("should return old page for old frontend version", async () => {
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
            forceUpdateOnVersionsBefore: "1.450"
          },
          ...oldPage()
        ]
      },
      params
    );
  });

  it("should return module layout for new frontend version", async () => {
    const params: IParams = {
      version: "1.649",
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
            forceUpdateOnVersionsBefore: "1.450"
          },
          ...newPage()
        ]
      },
      params
    );
  });
});
