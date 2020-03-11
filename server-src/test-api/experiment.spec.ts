import * as supertest from "supertest";

describe("Experiment API", () => {
  const experimentApi = "/spade/api/experiment";
  const app = require("../app").default;

  it("should return 400 when experiment name is not recognized", async () => {
    const response: supertest.Response = await supertest(app).get(
      `${experimentApi}/Experiment/50`
    );
    const { status } = response;
    expect(status).toBe(400);
  });
});
