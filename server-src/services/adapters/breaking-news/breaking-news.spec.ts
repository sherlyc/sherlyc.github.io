import cacheHttp from "../../utils/cache-http";
import config from "../../utils/config";
import { IParams } from "../../__types__/IParams";
import getBreakingNews from "./breaking-news";

jest.mock("../../utils/config");
jest.mock("../../utils/cache-http");

describe("Breaking news service", () => {
  const params: IParams = { apiRequestId: "request-id-for-testing" };

  beforeAll(() => {
    (cacheHttp as jest.Mock).mockReturnValue({
      get: jest.fn(),
      post: jest.fn()
    });
  });

  it("should get a breaking news", async () => {
    const breakingNewsData = {
      enabled: true,
      id: "whatever",
      text: "breaking_news_text",
      link: "http://example.com"
    };
    (cacheHttp as jest.Mock).mockResolvedValue({
      data: { breakingNews: { breakingNewsData } }
    });

    config.breakingNewsApi =
      "https://api-preprod.stuff.co.nz/isomorphic-api/breakingNews";
    expect(await getBreakingNews(params)).toEqual(breakingNewsData);
  });

  it("should not get a breaking news when content-api request fails", async () => {
    const error = new Error("AJAX error");
    (cacheHttp as jest.Mock).mockRejectedValue(error);
    await expect(getBreakingNews(params)).rejects.toEqual(error);
  });
});
