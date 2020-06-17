import { loadFromCache, saveToCache } from "./cache";
import http from "./http";

jest.mock("./http");

describe("Cache", () => {
  const params = { apiRequestId: "123123" };
  const url = "http://www.example.com";

  it("should save to cache when called", async () => {
    const getMock = jest.fn();
    (http as jest.Mock).mockReturnValue({ get: getMock });
    getMock.mockImplementationOnce(
      () => new Promise((resolve, reject) => setTimeout(resolve, 1000))
    );

    try {
      await saveToCache(params, url, false);
    } catch (error) {}
    expect(loadFromCache(url)).toBeTruthy();
  });

  it("should remove from cache when request throws error", async () => {
    const getMock = jest.fn();
    (http as jest.Mock).mockReturnValue({ get: getMock });
    getMock.mockImplementationOnce(
      () => new Promise((resolve, reject) => setTimeout(reject, 1000))
    );

    try {
      await saveToCache(params, url, false);
    } catch (error) {}
    expect(loadFromCache(url)).toBeFalsy();
  });

  it("should call with cache bust params when breaking the cache", async () => {
    const getMock = jest.fn();
    (http as jest.Mock).mockReturnValue({ get: getMock });
    getMock.mockImplementationOnce(
      () => new Promise((resolve) => setTimeout(resolve, 1000))
    );

    try {
      await saveToCache(params, url, true);
    } catch (error) {}
    expect(getMock).toHaveBeenCalledWith(url, {
      params: { "cache-bust": expect.any(String) }
    });
  });
});
