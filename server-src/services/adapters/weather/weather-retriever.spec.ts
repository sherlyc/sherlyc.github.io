import { weatherRetriever } from './weather-retriever';
import cacheHttp from '../../utils/cache-http';
import { IParams } from '../../__types__/IParams';
import * as weatherJson from './__fixtures__/weather.json';

jest.mock('../../utils/cache-http');

describe('Weather Retriever', () => {
  const params: IParams = { apiRequestId: 'request-id-for-testing' };

  beforeAll(() => {
    (cacheHttp as jest.Mock).mockReturnValue({
      get: jest.fn(),
      post: jest.fn()
    });
  });

  it('should respond with weather info when request is successful', async () => {
    (cacheHttp as jest.Mock).mockResolvedValue({
      status: 200,
      data: weatherJson
    });
    expect(await weatherRetriever('auckland', params)).toEqual(weatherJson);
  });

  it('should throw error when response data contains error', async () => {
    (cacheHttp as jest.Mock).mockResolvedValue({
      status: 200,
      data: { error: 'bad location', status: 'error' }
    });
    await expect(weatherRetriever('auckland', params)).rejects.toEqual(
      new Error('Failed to fetch weather')
    );
  });

  it('should throw error when response status code is not successful', async () => {
    (cacheHttp as jest.Mock).mockResolvedValue({
      status: 500
    });
    await expect(weatherRetriever('auckland', params)).rejects.toEqual(
      new Error('Failed to fetch weather')
    );
  });

  it('should throw error when response data does not have forecasts', async () => {
    (cacheHttp as jest.Mock).mockResolvedValue({
      status: 200,
      data: { ...weatherJson, oneword_forecasts: [] }
    });
    await expect(weatherRetriever('auckland', params)).rejects.toEqual(
      new Error('Missing forecasts')
    );
  });
});
