import { Forecasts } from "../../../../common/Forecasts";

export interface IWeather {
  temperature_unit: string;
  oneword_forecasts: Array<{
    [key: string]: any;
    oneword_forecast: Forecasts;
    min_temp: number;
    max_temp: number;
  }>;
  location: string;
  latest_reading: {
    [key: string]: any;
    temperature: number;
  };
}
