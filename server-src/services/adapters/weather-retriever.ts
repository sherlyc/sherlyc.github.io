import { IWeather } from './__types__/IWeather';
import config from '../utils/config';
import retry from '../utils/retry';
import http from '../utils/http';
import { URL } from 'url';
import { IParams } from '../__types__/IParams';
import { AxiosResponse } from 'axios';

const validate = (weatherResponse: AxiosResponse<IWeather>) => {
  const { data, status } = weatherResponse;
  if (status !== 200 || data.hasOwnProperty('error')) {
    throw new Error('Failed to fetch weather');
  }

  const forecastExists =
    data.oneword_forecasts && data.oneword_forecasts.length;
  if (data && !forecastExists) {
    throw new Error('Missing forecasts');
  }
};

async function requestWeatherData(
  location: string,
  params: IParams
): Promise<IWeather> {
  const url: URL = new URL(`${config.weatherAPI}?location=${location}`);
  const response = await http(params).get<IWeather>(url.href);
  validate(response);
  return response.data;
}

export const weatherRetriever = (location: string, params: IParams) =>
  retry(() => requestWeatherData(location, params), params);
