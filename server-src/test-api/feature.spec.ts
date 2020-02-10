import * as supertest from "supertest";
import { FeatureName } from "../../common/FeatureName";

describe("Feature API", () => {
  const featureApi = "/spade/api/feature";
  const app = require("../app").default;

  it("should return 200 when feature name is not recognized", async () => {
    const response: supertest.Response = await supertest(app).get(
      `${featureApi}/Feature/50/unknown`
    );

    const { body, status } = response;

    expect(status).toBe(200);
    expect(response.body).toBe(true);
  });

  describe("Recommendations", () => {
    const url = `${featureApi}/${FeatureName.Recommendation}`;

    it("should return true for internal lottery number 404", async () => {
      const response: supertest.Response = await supertest(app).get(
        `${url}/404/unknown`
      );

      expect(response.body).toBe(true);
    });

    it.each([[1], [100]])(
      "should return false for public lottery number %i",
      async (lotteryNumber: number) => {
        const response: supertest.Response = await supertest(app).get(
          `${url}/${lotteryNumber}/unknown`
        );

        expect(response.body).toBe(false);
      }
    );
  });

  describe("Recommendations Display", () => {
    const url = `${featureApi}/${FeatureName.RecommendationDisplay}`;

    it("should return true for internal lottery number 404", async () => {
      const response: supertest.Response = await supertest(app).get(
        `${url}/404/unknown`
      );

      expect(response.body).toBe(true);
    });

    it.each([[1], [100]])(
      "should return false for public lottery number %i",
      async (lotteryNumber: number) => {
        const response: supertest.Response = await supertest(app).get(
          `${url}/${lotteryNumber}/unknown`
        );

        expect(response.body).toBe(false);
      }
    );
  });
});
