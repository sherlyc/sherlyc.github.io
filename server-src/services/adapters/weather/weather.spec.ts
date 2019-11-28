import http from '../../utils/http';
import { IParams } from '../../__types__/IParams';
import * as weatherJson from './__fixtures__/weather.json';
import * as rawWeather from './__fixtures__/raw-weather.json';
import { weatherService } from './weather';
import { weatherRetriever } from './weather-retriever';

jest.mock('../../utils/http');
jest.mock('./weather-retriever');

describe('Weather service should', () => {
  const params: IParams = { apiRequestId: 'request-id-for-testing' };

  beforeAll(() => {
    (http as jest.Mock).mockReturnValue({
      get: jest.fn(),
      post: jest.fn()
    });
  });

  it('return weather data when location is provided', async () => {
    (weatherRetriever as jest.Mock).mockResolvedValue(weatherJson);

    expect(await weatherService('auckland', params)).toEqual(rawWeather);
  });
});
