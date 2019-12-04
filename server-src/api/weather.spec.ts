import { Request } from "express";
import { getWeather } from "./weather";
import { weatherService } from "../services/adapters/weather/weather";
import * as weatherData from "../services/adapters/weather/__fixtures__/raw-weather.json";

jest.mock("../services/adapters/weather/weather");

describe("Weather Api", () => {
  it("should send weather data when request is successful", async () => {
    const req = {
      spadeParams: { apiRequestId: "33498" },
      query: { location: "auckland" },
      cookies: {}
    } as Request;

    const res = {
      json: jest.fn(),
      sendStatus: jest.fn(),
      end: jest.fn()
    } as any;
    (weatherService as jest.Mock).mockResolvedValue(weatherData);

    await getWeather(req, res);

    expect(res.json).toHaveBeenCalledWith(weatherData);
    expect(res.end).toHaveBeenCalled();
  });

  it("should support path params", async () => {
    const req = ({
      spadeParams: { apiRequestId: "33498" },
      query: {},
      params: { location: "auckland" },
      cookies: {}
    } as any) as Request;

    const res = {
      json: jest.fn(),
      sendStatus: jest.fn(),
      end: jest.fn()
    } as any;
    (weatherService as jest.Mock).mockResolvedValue(weatherData);

    await getWeather(req, res);

    expect(res.json).toHaveBeenCalledWith(weatherData);
    expect(res.end).toHaveBeenCalled();
  });

  it("should send 500 status code when request failed", async () => {
    const req = {
      spadeParams: { apiRequestId: "33498" },
      query: { location: "auckland" },
      cookies: {}
    } as Request;
    const res = { sendStatus: jest.fn(), end: jest.fn() } as any;
    (weatherService as jest.Mock).mockRejectedValue(new Error());

    await getWeather(req, res);

    expect(res.sendStatus).toHaveBeenCalledWith(500);
  });
  it("should send 400 status code when location is not provided", async () => {
    const req = {
      spadeParams: { apiRequestId: "33498" },
      query: {},
      params: {},
      cookies: {}
    } as Request;
    const res = { sendStatus: jest.fn(), end: jest.fn() } as any;

    await getWeather(req, res);

    expect(res.sendStatus).toHaveBeenCalledWith(400);
  });
});
