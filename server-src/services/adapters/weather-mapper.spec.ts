import { weatherMapper } from './weather-mapper';
import * as weatherJson from './__fixtures__/weather.json';
import * as rawWeather from './__fixtures__/raw-weather.json';
import { cloneDeep } from 'lodash';
import { IWeather } from './__types__/IWeather';

describe('Weather Mapper should', () => {
  it('map weather response to rawWeather format', () => {
    const data: IWeather = cloneDeep(weatherJson);

    expect(weatherMapper(data)).toEqual(rawWeather);
  });
});
