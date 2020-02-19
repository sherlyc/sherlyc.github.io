import { weatherMapper } from "./weather-mapper";
import * as weatherJson from "./__fixtures__/weather.json";
import * as rawWeather from "./__fixtures__/raw-weather.json";
import { cloneDeep } from "lodash";
import { IWeather } from "../__types__/IWeather";
import { Forecasts } from "../../../../common/Forecasts";

describe("Weather Mapper should", () => {
  it("map weather response to rawWeather format", () => {
    const data = cloneDeep(weatherJson) as IWeather;

    expect(weatherMapper(data)).toEqual(rawWeather);
  });

  it.each([
    ["few showers", Forecasts.fewshowers],
    ["part   cloudy", Forecasts.partcloudy]
  ])(
    "sanitize weather condition",
    (forecast: string, expectedForecast: Forecasts) => {
      const weatherData: IWeather = {
        oneword_forecasts: [
          {
            day: "Fri",
            max_temp: 21,
            min_temp: 14,
            oneword_forecast: forecast as Forecasts
          }
        ],
        location: "",
        temperature_unit: "C",
        latest_reading: {
          temperature: 10
        }
      };

      const result = weatherMapper(weatherData);

      expect(result.condition).toEqual(expectedForecast);
    }
  );
});
