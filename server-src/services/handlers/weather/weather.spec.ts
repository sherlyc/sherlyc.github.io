import { IWeatherUnit } from "common/__types__/IWeatherUnit";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import { IParams } from "../../__types__/IParams";
import { HandlerInputType } from "../__types__/HandlerInputType";
import WeatherHandler from "./weather";

describe("WeatherHandler", () => {
  const params: IParams = { apiRequestId: "request-id-for-testing" };

  it("should return WeatherUnit", async () => {
    const handlerRunnerMock = jest.fn();
    const weatherUnit = (await WeatherHandler(
      handlerRunnerMock,
      {
        type: HandlerInputType.Weather
      },
      params
    )) as IWeatherUnit[];

    const expectedResult: IContentBlock[] = [
      {
        type: ContentBlockType.WeatherUnit
      } as IWeatherUnit
    ];

    expect(weatherUnit).toEqual(expectedResult);
  });
});
