import * as supertest from "supertest";
import { WeatherLocations } from "../../common/WeatherLocations";

describe("weather api test", () => {
  it.each([
    [WeatherLocations.Auckland],
    [WeatherLocations.NewPlymouth],
    [WeatherLocations.PalmerstonNorth]
  ])(
    "should return valid response when required querystring as %s is provided",
    async (location: string) => {
      const app = require("../app").default;

      const response: supertest.Response = await supertest(app)
        .get("/spade/api/weather")
        .query({ location })
        .set("Accept", "application/json");

      const { body } = response;
      expect(response.status).toBe(200);
      expect(response.header["content-type"]).toMatch(/application\/json/);
      expect(body).toHaveProperty("location");
      expect(body).toHaveProperty("temperatureUnit");
      expect(body).toHaveProperty("minTemp");
      expect(body).toHaveProperty("maxTemp");
      expect(body).toHaveProperty("condition");
      expect(body).toHaveProperty("temperature");
    }
  );

  it("should return 400 status code when required querystring is not provided", async () => {
    const app = require("../app").default;

    const response: supertest.Response = await supertest(app)
      .get("/spade/api/weather")
      .set("Accept", "application/json");

    expect(response.status).toBe(400);
  });
});
