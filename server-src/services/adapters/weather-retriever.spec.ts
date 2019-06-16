import { weatherRetriever } from './weather-retriever';
import http from '../utils/http';
import { IParams } from '../__types__/IParams';
import * as weatherJson from './__fixtures__/weather/weather.json';

jest.mock('../utils/http');

describe('Weather Retriever', () => {
  const params: IParams = { apiRequestId: 'request-id-for-testing' };

  beforeAll(() => {
    (http as jest.Mock).mockReturnValue({
      get: jest.fn(),
      post: jest.fn()
    });
  });

  it('should respond with weather info when request is successful', async () => {
    (http(params).get as jest.Mock).mockResolvedValue({
      status: 200,
      data: weatherJson
    });
    expect(await weatherRetriever('auckland', params)).toEqual(weatherJson);
  });

  it('should throw error when response data contains error', async () => {
    (http(params).get as jest.Mock).mockResolvedValue({
      status: 200,
      data: { error: 'bad location', status: 'error' }
    });
    await expect(weatherRetriever('auckland', params)).rejects.toEqual(
      new Error('Failed to fetch weather')
    );
  });

  it('should throw error when response status code is not successful', async () => {
    (http(params).get as jest.Mock).mockResolvedValue({
      status: 500
    });
    await expect(weatherRetriever('auckland', params)).rejects.toEqual(
      new Error('Failed to fetch weather')
    );
  });

  it('should throw error when response data does not have forecasts', async () => {
    (http(params).get as jest.Mock).mockResolvedValue({
      status: 200,
      data: { ...weatherJson, oneword_forecasts: [] }
    });
    await expect(weatherRetriever('auckland', params)).rejects.toEqual(
      new Error('Missing forecasts')
    );
  });
});
