import * as supertest from "supertest";
import { IPage } from "../../common/__types__/IPage";

describe("api test", () => {
  it("should respond with a json payload", async () => {
    const app = require("../app").default;
    const response: supertest.Response = await supertest(app)
      .get("/spade/api/content")
      .set("Accept", "application/json");

    expect(response.ok).toBeTruthy();
    expect(response.header["content-type"]).toMatch(/application\/json/);

    const page: IPage = response.body;
    expect(page.title).toBe(
      "Latest breaking news NZ | Stuff.co.nz | New Zealand"
    );
    expect(page.content).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: "Header" }),
        expect.objectContaining({
          type: "Container",
          items: expect.arrayContaining([
            expect.objectContaining({ type: "BasicAdUnit" }),
            expect.objectContaining({
              type: "ExperimentContainer",
              variants: expect.objectContaining({
                control: expect.arrayContaining([
                  expect.objectContaining({ type: "BasicArticleUnit" })
                ])
              })
            }),
            expect.objectContaining({ type: "ColumnContainer" }),
            expect.objectContaining({ type: "BasicArticleSection" })
          ])
        }),
        expect.objectContaining({ type: "Footer" })
      ])
    );
  });

  it("should accept requests with no version", async () => {
    const app = require("../app").default;
    const response: supertest.Response = await supertest(app)
      .get("/spade/api/content")
      .set("Accept", "application/json");

    expect(response.ok).toBeTruthy();
    expect(response.header["content-type"]).toMatch(/application\/json/);
  });

  it("should accept requests with version", async () => {
    const app = require("../app").default;
    const response: supertest.Response = await supertest(app)
      .get("/spade/api/1.0/content")
      .set("Accept", "application/json");

    expect(response.ok).toBeTruthy();
    expect(response.header["content-type"]).toMatch(/application\/json/);
  });
});
