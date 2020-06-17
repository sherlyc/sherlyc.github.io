import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IParams } from "../../__types__/IParams";
import { HandlerInput } from "../__types__/HandlerInput";
import { HandlerInputType } from "../__types__/HandlerInputType";
import { IVersionSwitcherHandlerInput } from "../__types__/IVersionSwitcherHandlerInput";
import VersionSwitcher from "./version-switcher";

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

  it.each`
    version       | handlerType     | handler
    ${"1.501"}    | ${"compatible"} | ${compatibleHandler}
    ${"1.500"}    | ${"compatible"} | ${compatibleHandler}
    ${"1.499"}    | ${"fallback"}   | ${fallbackHandler}
    ${"SNAPSHOT"} | ${"fallback"}   | ${fallbackHandler}
    ${undefined}  | ${"fallback"}   | ${fallbackHandler}
    ${null}       | ${"fallback"}   | ${fallbackHandler}
    ${""}         | ${"fallback"}   | ${fallbackHandler}
  `(
    "calls $handlerType handler for front-end version $version",
    async ({ version, handler }) => {
      params.version = version;
      const handlerInput: IVersionSwitcherHandlerInput = {
        type: HandlerInputType.VersionSwitcher,
        compatibleVersion: "1.500",
        compatibleHandler,
        fallbackHandler
      };
      const handlerRunnerMock = jest.fn();

      await VersionSwitcher(handlerRunnerMock, handlerInput, params);

      expect(handlerRunnerMock).toHaveBeenCalledWith(handler, params);
    }
  );
});
