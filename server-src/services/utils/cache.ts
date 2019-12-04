import { IParams } from "../__types__/IParams";
import { ICacheResult } from "./__types__/ICacheResult";
import http from "./http";

const cache: {
  [key: string]: ICacheResult | undefined;
} = {};

export const saveToCache = (params: IParams, url: string): Promise<any> => {
  const promise = http(params)
    .get(url)
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
