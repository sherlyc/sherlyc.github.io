import { IParams } from "../../__types__/IParams";
import cacheHttp from "../../utils/cache-http";
import { weatherRetriever } from "./weather-retriever";
import wrappedLogger from "../../utils/logger";

const weatherJson = require("./__fixtures__/weather.json");

jest.mock("../../utils/cache-http");
jest.mock("../../utils/logger");

describe("Weather Retriever", () => {
  const params: IParams = { apiRequestId: "request-id-for-testing" };

  beforeAll(() => {
    (cacheHttp as jest.Mock).mockReturnValue({
      get: jest.fn(),
      post: jest.fn()
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should respond with weather info when request is successful", async () => {
    (cacheHttp as jest.Mock).mockResolvedValue({
      status: 200,
      data: weatherJson
    });
    expect(await weatherRetriever("auckland", params)).toEqual(weatherJson);
  });

  it("should throw error when response data contains error", async () => {
    (cacheHttp as jest.Mock).mockResolvedValue({
      status: 200,
      data: { error: "bad location", status: "error" }
    });
    await expect(weatherRetriever("auckland", params)).rejects.toEqual(
      new Error("Failed to fetch weather for location: auckland")
    );
  });

  it("should throw error when response status code is not successful", async () => {
    (cacheHttp as jest.Mock).mockResolvedValue({
      status: 500
    });
    await expect(weatherRetriever("auckland", params)).rejects.toEqual(
      new Error("Failed to fetch weather for location: auckland")
    );
  });

  it("should throw error when response data does not have forecasts", async () => {
    (cacheHttp as jest.Mock).mockResolvedValue({
      status: 200,
      data: { ...weatherJson, oneword_forecasts: [] }
    });
    await expect(weatherRetriever("auckland", params)).rejects.toEqual(
      new Error("Missing forecasts for location: auckland")
    );
  });

  it("should log when oneword forecast is unknown", async () => {
    const unknownForecast = {
      day: "Fri",
      max_temp: 21,
      min_temp: 14,
      oneword_forecast: "coronavirus"
    };
    const location = "auckland";

    (cacheHttp as jest.Mock).mockResolvedValue({
      status: 200,
      data: {
        ...weatherJson,
        oneword_forecasts: [unknownForecast, unknownForecast]
      }
    });

    await weatherRetriever(location, params);

    expect(wrappedLogger.warn).toBeCalledTimes(2);
    expect(wrappedLogger.warn).nthCalledWith(
      1,
      params.apiRequestId,
      `Unknown forecast for weather service:${unknownForecast.oneword_forecast}, location:${location}`
    );
    expect(wrappedLogger.warn).nthCalledWith(
      2,
      params.apiRequestId,
      `Unknown forecast for weather service:${unknownForecast.oneword_forecast}, location:${location}`
    );
  });
});
