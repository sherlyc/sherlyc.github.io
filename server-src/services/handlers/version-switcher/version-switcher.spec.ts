import { IVersionSwitcherHandlerInput } from "../__types__/IVersionSwitcherHandlerInput";
import { HandlerInputType } from "../__types__/HandlerInputType";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import VersionSwitcher from "./version-switcher";
import { IParams } from "../../__types__/IParams";
import { HandlerInput } from "../__types__/HandlerInput";

describe("Version switcher", () => {
  let params: IParams;
  const compatibleHandler: HandlerInput = {
    type: HandlerInputType.ContentBlockHandler,
    contentBlocks: [
      {
        type: ContentBlockType.WeatherUnit
      }
    ]
  };
  const fallbackHandler: HandlerInput = {
    type: HandlerInputType.ContentBlockHandler,
    contentBlocks: []
  };

  beforeEach(() => {
    params = { apiRequestId: "request-id-for-testing" };
  });

  it("should call compatibleHandler when front end version match compatibleVersion", async () => {
    params.version = "1.500";
    const handlerInput: IVersionSwitcherHandlerInput = {
      type: HandlerInputType.VersionSwitcher,
      compatibleVersion: "1.500",
      compatibleHandler,
      fallbackHandler
    };
    const handlerRunnerMock = jest.fn();

    await VersionSwitcher(handlerRunnerMock, handlerInput, params);

    expect(handlerRunnerMock).toHaveBeenCalledWith(compatibleHandler, params);
  });

  it("should call compatibleHandler when front end version is higher than compatibleVersion", async () => {
    params.version = "1.501";
    const handlerInput: IVersionSwitcherHandlerInput = {
      type: HandlerInputType.VersionSwitcher,
      compatibleVersion: "1.500",
      compatibleHandler,
      fallbackHandler
    };
    const handlerRunnerMock = jest.fn();

    await VersionSwitcher(handlerRunnerMock, handlerInput, params);

    expect(handlerRunnerMock).toHaveBeenCalledWith(compatibleHandler, params);
  });

  it.each([["1.499"], ["SNAPSHOT"]])(
    "should call fallbackHandler when front end version (%s) is lower than compatibleVersion",
    async (frontendVersion: string) => {
      params.version = frontendVersion;
      const handlerInput: IVersionSwitcherHandlerInput = {
        type: HandlerInputType.VersionSwitcher,
        compatibleVersion: "1.500",
        compatibleHandler,
        fallbackHandler
      };
      const handlerRunnerMock = jest.fn();

      await VersionSwitcher(handlerRunnerMock, handlerInput, params);

      expect(handlerRunnerMock).toHaveBeenCalledWith(fallbackHandler, params);
    }
  );

  it("should call fallbackHandler when front end version is not provided", async () => {
    params.version = undefined;
    const handlerInput: IVersionSwitcherHandlerInput = {
      type: HandlerInputType.VersionSwitcher,
      compatibleVersion: "1.500",
      compatibleHandler,
      fallbackHandler
    };
    const handlerRunnerMock = jest.fn();

    await VersionSwitcher(handlerRunnerMock, handlerInput, params);

    expect(handlerRunnerMock).toHaveBeenCalledWith(fallbackHandler, params);
  });
});
