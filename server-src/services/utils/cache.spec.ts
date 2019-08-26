import http from './http';
import { loadFromCache, saveToCache } from './cache';

jest.mock('./http');

describe('Cache', () => {
  const params = { apiRequestId: '123123' };
  const url = 'http://www.example.com';

  it('should save to cache when called', async () => {
    const getMock = jest.fn();
    (http as jest.Mock).mockReturnValue({ get: getMock });
    getMock.mockImplementationOnce(
      () => new Promise((resolve, reject) => setTimeout(resolve, 1000))
    );

    try {
      await saveToCache(params, url);
    } catch (error) {}
    expect(loadFromCache(url)).toBeTruthy();
  });

  it('should remove from cache when request throws error', async () => {
    const getMock = jest.fn();
    (http as jest.Mock).mockReturnValue({ get: getMock });
    getMock.mockImplementationOnce(
      () => new Promise((resolve, reject) => setTimeout(reject, 1000))
    );

    try {
      await saveToCache(params, url);
    } catch (error) {}
    expect(loadFromCache(url)).toBeFalsy();
  });
});