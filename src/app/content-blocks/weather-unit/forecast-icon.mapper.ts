import { Forecasts } from '../../../../common/Forecasts';

const ForecastIconMapper = {
  [Forecasts.cloud]: '/assets/icons/weather/weather-forecast--cloud.svg',
  [Forecasts.drizzle]: '/assets/icons/weather/weather-forecast--drizzle.svg',
  [Forecasts.fewshowers]:
    '/assets/icons/weather/weather-forecast--fewshowers.svg',
  [Forecasts.fine]: '/assets/icons/weather/weather-forecast--fine.svg',
  [Forecasts.finewithshowers]:
    '/assets/icons/weather/weather-forecast--finewithshowers.svg',
  [Forecasts.fog]: '/assets/icons/weather/weather-forecast--fog.svg',
  [Forecasts.hail]: '/assets/icons/weather/weather-forecast--hail.svg',
  [Forecasts.partcloudy]:
    '/assets/icons/weather/weather-forecast--partcloudy.svg',
  [Forecasts.rain]: '/assets/icons/weather/weather-forecast--rain.svg',
  [Forecasts.showers]: '/assets/icons/weather/weather-forecast--showers.svg',
  [Forecasts.snow]: '/assets/icons/weather/weather-forecast--snow.svg',
  [Forecasts.thunder]: '/assets/icons/weather/weather-forecast--thunder.svg',
  [Forecasts.unknown]: '/assets/icons/weather/weather-forecast--unknown.svg',
  [Forecasts.wind]: '/assets/icons/weather/weather-forecast--wind.svg'
};

export const mapForecastToIcon = (forecast: Forecasts) => {
  if (ForecastIconMapper[forecast]) {
    return ForecastIconMapper[forecast];
  }
  return ForecastIconMapper[Forecasts.unknown];
};
