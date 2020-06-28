import * as supertest from "supertest";
import { ContentBlockType } from "../../common/__types__/ContentBlockType";
import { IPage } from "../../common/__types__/IPage";

jest.setTimeout(10000);

describe("api test", () => {
  it.each([["1.648"], ["SNAPSHOT"], [""]])(
    "should return page v0 for front end version %s ",
    async (frontendVersion: string) => {
      const app = require("../app").default;
      const response: supertest.Response = await supertest(app)
        .get(`/spade/api/${frontendVersion}/content`)
        .set("Accept", "application/json");

      expect(response.ok).toBeTruthy();
      expect(response.header["content-type"]).toMatch(/application\/json/);

      const page: IPage = response.body;
      expect(page.title).toBe(
        "Latest breaking news NZ | Stuff.co.nz | New Zealand"
      );
      expect(page.content).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ type: ContentBlockType.Header }),
          expect.objectContaining({
            type: ContentBlockType.Container,
            items: expect.arrayContaining([
              expect.objectContaining({
                type: ContentBlockType.ColumnContainer
              })
            ])
          }),
          expect.objectContaining({ type: ContentBlockType.Footer })
        ])
      );
    }
  );

  it("should return page v1 for front end version above 1.649", async () => {
    const app = require("../app").default;
    const response: supertest.Response = await supertest(app)
      .get("/spade/api/1.649/content")
      .set("Accept", "application/json");

    expect(response.ok).toBeTruthy();
    expect(response.header["content-type"]).toMatch(/application\/json/);

    const page: IPage = response.body;
    expect(page.title).toBe(
      "Latest breaking news NZ | Stuff.co.nz | New Zealand"
    );
    expect(page.content).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: ContentBlockType.Header }),
        expect.objectContaining({
          type: ContentBlockType.Container,
          items: expect.arrayContaining([
            expect.objectContaining({
              type: ContentBlockType.GridContainer,
              items: expect.objectContaining({
                ModuleTitle: expect.arrayContaining([
                  expect.objectContaining({
                    type: ContentBlockType.ModuleTitle
                  })
                ])
              })
            })
          ])
        }),
        expect.objectContaining({ type: ContentBlockType.Footer })
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
      .get("/spade/api/1.450/content")
      .set("Accept", "application/json");

    expect(response.ok).toBeTruthy();
    expect(response.header["content-type"]).toMatch(/application\/json/);
  });
});
