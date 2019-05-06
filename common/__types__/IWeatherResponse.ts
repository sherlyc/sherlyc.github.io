import { Forecasts } from '../../common/Forecasts';

export interface IWeatherResponse {
  temperature_unit: string;
  min_temp: number;
  max_temp: number;
  location: string;
  temperature: number;
  condition: Forecasts;
}
