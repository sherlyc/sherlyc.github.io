import { AxiosResponse } from "axios";
import { IParams } from "../__types__/IParams";
import { loadFromCache, saveToCache } from "./cache";
import { ICacheResult } from "./__types__/ICacheResult";

function hasExpired(cacheResult: ICacheResult, ttl: number) {
  return cacheResult.timestamp + ttl <= Date.now();
}

export default function cacheHttp<T extends any>(
  params: IParams,
  url: string,
  ttl: number = 20000,
  breakCache = false
): Promise<AxiosResponse<T>> {
  const currentCachedResult = loadFromCache(url);
  if (!currentCachedResult || hasExpired(currentCachedResult, ttl)) {
    return saveToCache(params, url, breakCache);
  }
  return currentCachedResult.promise;
}
