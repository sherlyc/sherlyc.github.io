import { Forecasts } from "../Forecasts";

export interface IWeatherResponse {
  temperatureUnit: string;
  minTemp: number;
  maxTemp: number;
  location: string;
  temperature: number;
  condition: Forecasts;
}
