import { weatherRetriever } from "./weather-retriever";
import { weatherMapper } from "./weather-mapper";
import { IParams } from "../../__types__/IParams";
import { IWeatherResponse } from "../../../../common/__types__/IWeatherResponse";

export const weatherService = async (
  location: string,
  params: IParams
): Promise<IWeatherResponse> => {
  const weatherInfo = await weatherRetriever(location, params);
  return weatherMapper(weatherInfo);
};
