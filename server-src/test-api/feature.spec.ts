import * as supertest from "supertest";

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
});
