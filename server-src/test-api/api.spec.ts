import * as supertest from "supertest";
import { IPage } from "../../common/__types__/IPage";
import { ContentBlockType } from "../../common/__types__/ContentBlockType";
import { FeatureName } from "../../common/FeatureName";

jest.setTimeout(10000);

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
        expect.objectContaining({ type: ContentBlockType.Header }),
        expect.objectContaining({
          type: ContentBlockType.Container,
          items: expect.arrayContaining([
            expect.objectContaining({
              type: ContentBlockType.FeatureContainer,
              name: FeatureName.ModuleLayout,
              content: expect.arrayContaining([
                expect.objectContaining({
                  type: ContentBlockType.GridContainer
                })
              ])
            }),
            expect.objectContaining({
              type: ContentBlockType.FeatureContainer,
              name: FeatureName.StrapLayout,
              fallback: expect.arrayContaining([
                expect.objectContaining({ type: ContentBlockType.BasicAdUnit }),
                expect.objectContaining({
                  type: ContentBlockType.ExperimentContainer,
                  variants: expect.objectContaining({
                    control: expect.arrayContaining([
                      expect.objectContaining({
                        type: ContentBlockType.BasicArticleUnit
                      })
                    ])
                  })
                }),
                expect.objectContaining({
                  type: ContentBlockType.ColumnContainer
                }),
                expect.objectContaining({
                  type: ContentBlockType.BasicArticleSection
                })
              ])
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
      .get("/spade/api/1.0/content")
      .set("Accept", "application/json");

    expect(response.ok).toBeTruthy();
    expect(response.header["content-type"]).toMatch(/application\/json/);
  });
});
