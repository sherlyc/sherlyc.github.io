import { Forecasts } from '../../../../common/Forecasts';

const ForecastIconMapper = {
  [Forecasts.cloud]: '/spade/assets/icons/weather/weather-forecast--cloud.svg',
  [Forecasts.drizzle]:
    '/spade/assets/icons/weather/weather-forecast--drizzle.svg',
  [Forecasts.fewshowers]:
    '/spade/assets/icons/weather/weather-forecast--fewshowers.svg',
  [Forecasts.fine]: '/spade/assets/icons/weather/weather-forecast--fine.svg',
  [Forecasts.finewithshowers]:
    '/spade/assets/icons/weather/weather-forecast--finewithshowers.svg',
  [Forecasts.fog]: '/spade/assets/icons/weather/weather-forecast--fog.svg',
  [Forecasts.hail]: '/spade/assets/icons/weather/weather-forecast--hail.svg',
  [Forecasts.partcloudy]:
    '/spade/assets/icons/weather/weather-forecast--partcloudy.svg',
  [Forecasts.rain]: '/spade/assets/icons/weather/weather-forecast--rain.svg',
  [Forecasts.showers]:
    '/spade/assets/icons/weather/weather-forecast--showers.svg',
  [Forecasts.snow]: '/spade/assets/icons/weather/weather-forecast--snow.svg',
  [Forecasts.thunder]:
    '/spade/assets/icons/weather/weather-forecast--thunder.svg',
  [Forecasts.unknown]:
    '/spade/assets/icons/weather/weather-forecast--unknown.svg',
  [Forecasts.wind]: '/spade/assets/icons/weather/weather-forecast--wind.svg'
};

export const mapForecastToIcon = (forecast: Forecasts) => {
  if (ForecastIconMapper[forecast]) {
    return ForecastIconMapper[forecast];
  }
  return ForecastIconMapper[Forecasts.unknown];
};
