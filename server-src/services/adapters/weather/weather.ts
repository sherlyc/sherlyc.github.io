import { IWeatherResponse } from "../../../../common/__types__/IWeatherResponse";
import { IParams } from "../../__types__/IParams";
import { weatherMapper } from "./weather-mapper";
import { weatherRetriever } from "./weather-retriever";

export const weatherService = async (
  location: string,
  params: IParams
): Promise<IWeatherResponse> => {
  const weatherInfo = await weatherRetriever(location, params);
  return weatherMapper(weatherInfo);
};
