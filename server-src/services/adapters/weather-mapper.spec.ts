import { weatherMapper } from './weather-mapper';
import * as weatherJson from './__fixtures__/weather/weather.json';
import * as rawWeather from './__fixtures__/weather/raw-weather.json';
import { cloneDeep } from 'lodash';
import { IWeather } from './__types__/IWeather';

describe('Weather Mapper should', () => {
  it('map weather response to rawWeather format', () => {
    const data = cloneDeep(weatherJson) as IWeather;

    expect(weatherMapper(data)).toEqual(rawWeather);
  });
});
