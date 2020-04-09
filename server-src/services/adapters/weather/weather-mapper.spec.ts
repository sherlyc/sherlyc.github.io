import cloneDeep from "lodash-es/cloneDeep";
import { Forecasts } from "../../../../common/Forecasts";
import { IWeather } from "../__types__/IWeather";
import { weatherMapper } from "./weather-mapper";

const weatherJson = require("./__fixtures__/weather.json");
const rawWeather = require("./__fixtures__/raw-weather.json");

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
