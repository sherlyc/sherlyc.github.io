import * as supertest from "supertest";
import { ContentBlockType } from "../../common/__types__/ContentBlockType";
import { IPage } from "../../common/__types__/IPage";
import { formatVersion, parseVersion } from "../services/utils/version";

jest.setTimeout(10000);

const currVer = process.env.SPADE_VERSION || "SNAPSHOT";
const nextVer = formatVersion(parseVersion(currVer) + parseVersion("0.1"));

describe("api test", () => {
  it.each([["1.648"], ["SNAPSHOT"], [""]])(
    "should return old layout for front end version %s ",
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

  describe("version guard", () => {
    it.each`
      version              | responseOk
      ${"1.300"}           | ${true}
      ${currVer}           | ${true}
      ${"SNAPSHOT"}        | ${true}
      ${"1.299"}           | ${false}
      ${nextVer}           | ${false}
      ${"randomgibberish"} | ${false}
    `(
      "returns response.ok === $responseOk for version $version",
      async ({ version, responseOk }) => {
        const app = require("../app").default;
        const response: supertest.Response = await supertest(app)
          .get(`/spade/api/${version}/content`)
          .set("Accept", "application/json");
        expect(response.ok).toBe(responseOk);
      }
    );

    it("skips checking if BE version is undefined", async () => {
      const ENV = process.env;
      delete process.env.SPADE_VERSION;

      const app = require("../app").default;
      const response: supertest.Response = await supertest(app)
        .get(`/spade/api/randomgibberish/content`)
        .set("Accept", "application/json");
      expect(response.ok).toBe(true);

      process.env = ENV;
    });
  });

  it("should return new layout for new front end version", async () => {
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
              type: ContentBlockType.GridContainer
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
