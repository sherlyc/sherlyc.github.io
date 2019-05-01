import { IWeather } from './__types__/IWeather';
import { IWeatherResponse } from './__types__/IWeatherResponse';

export const weatherMapper = (weatherInfo: IWeather): IWeatherResponse => {
  const todayWeather = weatherInfo.oneword_forecasts[0];
  return {
    temperature_unit: weatherInfo.temperature_unit,
    location: weatherInfo.location,
    temperature: weatherInfo.latest_reading.temperature,
    min_temp: todayWeather.min_temp,
    max_temp: todayWeather.max_temp,
    condition: todayWeather.oneword_forecast
  };
};
