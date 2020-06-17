import { IWeather } from "../__types__/IWeather";
import config from "../../utils/config";
import retry from "../../utils/retry";
import cacheHttp from "../../utils/cache-http";
import { URL } from "url";
import { IParams } from "../../__types__/IParams";
import { AxiosResponse } from "axios";
import { Forecasts } from "../../../../common/Forecasts";
import logger from "../../utils/logger";

const validate = (
  weatherResponse: AxiosResponse<IWeather>,
  location: string,
  params: IParams
) => {
  const { data, status } = weatherResponse;
  if (status !== 200 || data.hasOwnProperty("error")) {
    throw new Error(`Failed to fetch weather for location: ${location}`);
  }

  const forecastExists =
    data.oneword_forecasts && data.oneword_forecasts.length;
  if (data && !forecastExists) {
    throw new Error(`Missing forecasts for location: ${location}`);
  }

  data.oneword_forecasts.forEach((forecast) => {
    if (!Object.values(Forecasts).includes(forecast.oneword_forecast)) {
      logger.warn(
        params.apiRequestId,
        `Unknown forecast for weather service:${forecast.oneword_forecast}, location:${location}`
      );
    }
  });
};

async function requestWeatherData(
  location: string,
  params: IParams
): Promise<IWeather> {
  const url: URL = new URL(`${config.weatherAPI}?location=${location}`);
  const response = await cacheHttp(params, url.href);
  validate(response, location, params);
  return response.data;
}

export const weatherRetriever = (location: string, params: IParams) =>
  retry(() => requestWeatherData(location, params), params);
