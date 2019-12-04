import { IParams } from "../__types__/IParams";
import { loadFromCache, saveToCache } from "./cache";
import { ICacheResult } from "./__types__/ICacheResult";
import { AxiosResponse } from "axios";

function hasExpired(cacheResult: ICacheResult) {
  return cacheResult.timestamp + 10000 <= Date.now();
}

export default function cacheHttp<T extends any>(
  params: IParams,
  url: string
): Promise<AxiosResponse<T>> {
  const currentCachedResult = loadFromCache(url);
  if (!currentCachedResult || hasExpired(currentCachedResult)) {
    return saveToCache(params, url);
  }
  return currentCachedResult.promise;
}
