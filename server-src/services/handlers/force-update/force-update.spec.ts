import ForceUpdate from "./force-update";
import { IParams } from "../../__types__/IParams";
import { IForceUpdateHandlerInput } from "../__types__/IForceUpdateHandlerInput";
import { HandlerInputType } from "../__types__/HandlerInputType";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";

describe("Force Update", () => {
  const handlerRunnerMock = jest.fn();

  it("should add iframe when params version is below the configuration version", async () => {
    const params: IParams = {
      apiRequestId: "request-id-for-testing",
      version: "1.300"
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

    const expected = [
      {
        type: ContentBlockType.ExternalContentUnit,
        url: "/spade/assets/pwa/uninstall_pwa.html",
        mobile: {
          height: "0",
          margin: "0",
          scrollable: false,
          width: "100%"
        }
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
