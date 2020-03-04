import {
  retrieveSectionList,
  retrieveListAsset,
  retrieveArticle
} from "./jsonfeed-retriever";
import * as jsonfeed from "./__fixtures__/jsonfeed.json";
import * as midStripData from "./__fixtures__/mid-strip.json";
import cacheHttp from "../../utils/cache-http";
import { Section } from "../../section";
import { IParams } from "../../__types__/IParams";
import { JsonFeedAssetType } from "../__types__/JsonFeedAssetType";
import { IJsonFeedArticle } from "../__types__/IJsonFeedArticle";
import config from "../../utils/config";

jest.mock("../../utils/cache-http");

describe("JsonFeed Retriever", () => {
  const params: IParams = { apiRequestId: "request-id-for-testing" };

  beforeAll(() => {
    (cacheHttp as jest.Mock).mockReturnValue({
      get: jest.fn(),
      post: jest.fn()
    });
  });

  it("should respond with the article list given a section", async () => {
    (cacheHttp as jest.Mock).mockResolvedValue({ data: jsonfeed });
    expect(await retrieveSectionList(Section.Latest, 6, params)).toEqual(
      jsonfeed
    );
  });

  it("should throw error when jsonfeed request for article section list fails", async () => {
    const error = new Error("AJAX error");
    (cacheHttp as jest.Mock).mockRejectedValue(error);
    await expect(
      retrieveSectionList(Section.Latest, 6, params)
    ).rejects.toEqual(error);
  });

  it("should respond with a list data given a list id", async () => {
    (cacheHttp as jest.Mock).mockResolvedValue({ data: midStripData });

    expect(await retrieveListAsset("34934820", params, 2)).toEqual(
      midStripData
    );
  });

  it("should throw error when jsonfeed request for a list fails", async () => {
    const error = new Error("AJAX error");
    (cacheHttp as jest.Mock).mockRejectedValue(error);

    await expect(retrieveListAsset("34934820", params, 2)).rejects.toEqual(
      error
    );
  });

  it("should retrieve specified number of articles", async () => {
    (cacheHttp as jest.Mock).mockResolvedValue({ data: midStripData });

    const midStripJsonFeed = await retrieveListAsset("34934820", params, 1);

    const articles = midStripJsonFeed.assets;
    expect(articles.length).toEqual(1);
  });

  it("should retrieve all articles if specifed total is more than number of articles received", async () => {
    (cacheHttp as jest.Mock).mockResolvedValue({ data: midStripData });

    const midStripJsonFeed = await retrieveListAsset("34934820", params, 5);

    const articles = midStripJsonFeed.assets;
    expect(articles.length).toEqual(2);
  });

  it("should retrieve single article by id", async () => {
    const article = {
      id: 1,
      asset_type: JsonFeedAssetType.ARTICLE,
      headline_flags: [],
      sponsored: false,
      path: "/link",
      title: "title",
      alt_headline: "headline",
      byline: "Jane Doe",
      isHeadlineOverrideApplied: true,
      datetime_iso8601: "123235345",
      alt_intro: "intro",
      identifier: "identifier"
    } as IJsonFeedArticle;
    (cacheHttp as jest.Mock).mockResolvedValue({ data: article });

    const result = await retrieveArticle(123123, params);

    expect(cacheHttp).toHaveBeenCalledWith(
      params,
      `${config.jsonFeedAPI}/article/123123`
    );
    expect(result).toEqual(article);
  });
});
