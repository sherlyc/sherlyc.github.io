import cacheHttp from './cache-http';
import { IParams } from '../__types__/IParams';
import { loadFromCache, saveToCache } from './cache';

jest.mock('./cache');

describe('Cache Request', () => {
  const params: IParams = { apiRequestId: '123123' };
  const url = 'http://www.example.com';

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should save to cache and return cached request if request does not exist in cache', () => {
    const promise = Promise.resolve();
    (loadFromCache as jest.Mock).mockReturnValueOnce(undefined);
    (saveToCache as jest.Mock).mockReturnValueOnce(promise);

    const cachedRequest = cacheHttp(params, url);

    expect(saveToCache).toHaveBeenCalledWith(params, url);
    expect(cachedRequest).toBe(promise);
  });

  it('should save to cache and return cached request if request was cached for 10 seconds or more', () => {
    const newCachedRequest = Promise.resolve();
    const now = Date.now();
    (loadFromCache as jest.Mock).mockReturnValueOnce({
      timestamp: now - 10000,
      promise: new Promise(() => {})
    });
    (saveToCache as jest.Mock).mockReturnValueOnce(newCachedRequest);

    const result = cacheHttp(params, url);

    expect(saveToCache).toHaveBeenCalledWith(params, url);
    expect(result).toBe(newCachedRequest);
  });

  it('should not save to cache and return cached request if request was cached for less than 10 seconds', () => {
    const cachedRequest = Promise.resolve();
    const cachedResult = {
      timestamp: Date.now() - 9000,
      promise: cachedRequest
    };
    (loadFromCache as jest.Mock).mockReturnValue(cachedResult);

    const result = cacheHttp(params, url);

    expect(saveToCache).not.toHaveBeenCalled();
    expect(result).toBe(cachedRequest);
  });

  it('should not save to cache and return cached request if request already exists in cache', () => {
    const cachedRequest = Promise.resolve();
    (loadFromCache as jest.Mock).mockReturnValue({
      timestamp: Date.now(),
      promise: cachedRequest
    });

    const result = cacheHttp(params, url);

    expect(saveToCache).not.toHaveBeenCalledWith(params, url);
    expect(result).toBe(cachedRequest);
  });
});
