import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IParams } from "../../__types__/IParams";
import { HandlerInputType } from "../__types__/HandlerInputType";
import { IForceUpdateHandlerInput } from "../__types__/IForceUpdateHandlerInput";
import ForceUpdate from "./force-update";

describe("Force Update", () => {
  const handlerRunnerMock = jest.fn();
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it("should add iframe when params version is below the configuration version", async () => {
    const params: IParams = {
      apiRequestId: "request-id-for-testing",
      version: "1.300"
    };
    process.env.SPADE_VERSION = "1.401";

    const forceUpdateHandlerInput: IForceUpdateHandlerInput = {
      type: HandlerInputType.ForceUpdate,
      forceUpdateOnVersionsBefore: "1.400"
    };

    const result = await ForceUpdate(
      handlerRunnerMock,
      forceUpdateHandlerInput,
      params
    );

    const expected = [
      {
        type: ContentBlockType.ExternalContentUnit,
        height: "0",
        margin: "0",
        scrollable: false,
        url: "/spade/assets/pwa/uninstall_pwa.html?fe=1.300&be=1.401",
        width: "100%"
      }
    ];

    expect(result).toEqual(expected);
  });

  it("should return empty when params version is higher than configuration version", async () => {
    const params: IParams = {
      apiRequestId: "request-id-for-testing",
      version: "1.500"
    };

    const forceUpdateHandlerInput: IForceUpdateHandlerInput = {
      type: HandlerInputType.ForceUpdate,
      forceUpdateOnVersionsBefore: "1.400"
    };

    const result = await ForceUpdate(
      handlerRunnerMock,
      forceUpdateHandlerInput,
      params
    );

    const expected: void[] = [];

    expect(result).toEqual(expected);
  });
});
