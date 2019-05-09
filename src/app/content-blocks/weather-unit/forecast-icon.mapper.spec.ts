import { mapForecastToIcon } from './forecast-icon.mapper';
import { Forecasts } from '../../../../common/Forecasts';

describe('ForecastIconMapper', () => {
  it('should return svg path that exists in the ForecastIconMap', () => {
    const svgPath = mapForecastToIcon(Forecasts.partcloudy);

    expect(svgPath).toBe(
      '/spade/assets/icons/weather/weather-forecast--partcloudy.svg'
    );
  });

  it('should return path to unknown svg icon when forecast is not valid', () => {
    const svgPath = mapForecastToIcon('unknownForecast' as Forecasts);

    expect(svgPath).toBe(
      '/spade/assets/icons/weather/weather-forecast--unknown.svg'
    );
  });
});
