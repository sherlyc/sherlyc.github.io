import cacheHttp from "../../utils/cache-http";
import config from "../../utils/config";
import wrappedLogger from "../../utils/logger";
import { IParams } from "../../__types__/IParams";
import { getArticleById } from "../jsonfeed/jsonfeed";
import { getMostPopular } from "./most-popular.service";

jest.mock("../../utils/cache-http");
jest.mock("../jsonfeed/jsonfeed");
jest.mock("../../utils/logger");

describe("Most popular service", function () {
  const params: IParams = {
    apiRequestId: "1"
  };
  const rawArticle = (id: string) => ({
    id
  });
  const mostPopularResponse = {
    data: {
      mostPopular: {
        mostPopularArticles: [{ id: "1" }, { id: "2" }, { id: "3" }],
        error: false
      }
    }
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should get articles from most popular service", async () => {
    const limit = 3;
    (cacheHttp as jest.Mock).mockResolvedValue(mostPopularResponse);
    (getArticleById as jest.Mock).mockImplementation(async (_, id) =>
      rawArticle(`${id}`)
    );

    const articles = await getMostPopular(limit, params);

    expect(cacheHttp).toHaveBeenCalledWith(params, config.mostPopularApi);
    expect(getArticleById).toHaveBeenNthCalledWith(1, params, 1);
    expect(getArticleById).toHaveBeenNthCalledWith(2, params, 2);
    expect(getArticleById).toHaveBeenNthCalledWith(3, params, 3);
    expect(articles).toEqual([{ id: "1" }, { id: "2" }, { id: "3" }]);
  });

  it("should remove articles based on limit", async () => {
    const limit = 1;
    (cacheHttp as jest.Mock).mockResolvedValue(mostPopularResponse);
    (getArticleById as jest.Mock).mockImplementation(async (_, id) =>
      rawArticle(`${id}`)
    );

    const articles = await getMostPopular(limit, params);

    expect(articles).toEqual([expect.objectContaining({ id: "1" })]);
  });

  it("should ignore articles that failed to be retrieved", async () => {
    const limit = 2;
    const error = new Error("Internal Server Error");
    (cacheHttp as jest.Mock).mockResolvedValue(mostPopularResponse);
    (getArticleById as jest.Mock).mockImplementation(async (_, id) =>
      id === 2 ? Promise.reject(error) : Promise.resolve(rawArticle(`${id}`))
    );

    const articles = await getMostPopular(limit, params);

    expect(articles).toEqual([
      expect.objectContaining({ id: "1" }),
      expect.objectContaining({ id: "3" })
    ]);
  });

  it("should log error if fail to retrieve from most popular service", async () => {
    const error = new Error("Internal Server Error");
    (cacheHttp as jest.Mock).mockRejectedValue(error);

    await expect(getMostPopular(10, params)).rejects.toEqual(error);

    expect(wrappedLogger.error).toHaveBeenCalledWith(
      params.apiRequestId,
      expect.stringContaining("Most popular service level error"),
      error
    );
  });

  it("should log error if most popular service return error in payload", async () => {
    (cacheHttp as jest.Mock).mockResolvedValue({
      data: {
        mostPopular: {
          mostPopularArticles: [],
          error: true
        }
      }
    });

    const error = new Error("Most Popular Service: API returns error");
    await expect(getMostPopular(10, params)).rejects.toEqual(error);

    expect(wrappedLogger.error).toHaveBeenCalledWith(
      params.apiRequestId,
      expect.stringContaining("Most popular service level error"),
      error
    );
  });

  it("should log error if more than half of articles are missing", async () => {
    const error = Error(
      "Most Popular Service: more than half of articles are missing"
    );
    (cacheHttp as jest.Mock).mockResolvedValue(mostPopularResponse);
    (getArticleById as jest.Mock).mockRejectedValue(
      new Error("Internal Server Error")
    );

    await expect(getMostPopular(10, params)).rejects.toEqual(error);

    expect(wrappedLogger.error).toHaveBeenCalledWith(
      params.apiRequestId,
      expect.stringContaining("Most popular service level error"),
      error
    );
  });
});
