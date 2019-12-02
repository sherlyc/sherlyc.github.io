import { IWeather } from '../__types__/IWeather';
import { IWeatherResponse } from '../../../../common/__types__/IWeatherResponse';

export const weatherMapper = (weatherInfo: IWeather): IWeatherResponse => {
  const todayWeather = weatherInfo.oneword_forecasts[0];
  return {
    temperatureUnit: weatherInfo.temperature_unit,
    location: weatherInfo.location,
    temperature: weatherInfo.latest_reading.temperature,
    minTemp: todayWeather.min_temp,
    maxTemp: todayWeather.max_temp,
    condition: todayWeather.oneword_forecast
  };
};
