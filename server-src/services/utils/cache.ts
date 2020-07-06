import { AxiosRequestConfig } from "axios";
import { IParams } from "../__types__/IParams";
import http from "./http";
import { ICacheResult } from "./__types__/ICacheResult";

const cache: {
  [key: string]: ICacheResult | undefined;
} = {};

export const saveToCache = (
  params: IParams,
  url: string,
  config: AxiosRequestConfig,
  breakCache: boolean
): Promise<any> => {
  const promise = http(params)
    .get(url, {
      params: breakCache && { "cache-bust": `${Math.random()}` },
      ...config
    })
    .catch((error) => {
      delete cache[url];
      throw error;
    });

  cache[url] = {
    timestamp: Date.now(),
    promise
  };
  return promise;
};

export const loadFromCache = (url: string): ICacheResult | undefined => {
  return cache[url];
};
