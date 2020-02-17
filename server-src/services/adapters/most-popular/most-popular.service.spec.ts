import { getMostPopular } from "./most-popular.service";
import { IParams } from "../../__types__/IParams";
import cacheHttp from "../../utils/cache-http";
import config from "../../utils/config";
import { getArticleById } from "../jsonfeed/jsonfeed";
import wrappedLogger from "../../utils/logger";

jest.mock("../../utils/cache-http");
jest.mock("../jsonfeed/jsonfeed");
jest.mock("../../utils/logger");

describe("Most popular service", function() {
  const params: IParams = {
    apiRequestId: "1"
  };
  const rawArticle = (id: string) => ({
    id
  });
  const mostPopularResponse = {
    data: {
      stories: [
        {
          storyId: "1"
        },
        {
          storyId: "2"
        }
      ]
    }
  };

  it("should get articles from most popular service", async () => {
    const limit = 10;
    (cacheHttp as jest.Mock).mockResolvedValue(mostPopularResponse);
    (getArticleById as jest.Mock).mockResolvedValueOnce(rawArticle("1"));
    (getArticleById as jest.Mock).mockResolvedValueOnce(rawArticle("2"));

    const articles = await getMostPopular(limit, params);

    expect(cacheHttp).toHaveBeenCalledWith(
      params,
      `${config.mostPopularApi}?limit=${limit}`
    );
    expect(getArticleById).toHaveBeenNthCalledWith(1, params, 1);
    expect(getArticleById).toHaveBeenNthCalledWith(2, params, 2);
    expect(articles).toEqual([
      expect.objectContaining({ id: "1" }),
      expect.objectContaining({ id: "2" })
    ]);
  });

  it("should log warning if fail to retrieve from most popular service", async () => {
    const error = new Error("Internal Server Error");
    (cacheHttp as jest.Mock).mockRejectedValue(error);

    const articles = await getMostPopular(10, params);

    expect(wrappedLogger.warn).toHaveBeenCalledWith(
      params.apiRequestId,
      expect.stringContaining("Most popular service level error"),
      error
    );
    expect(articles).toEqual([]);
  });

  it("should log warning if fail to retrieve article", async () => {
    const error = new Error("Internal Server Error");
    (cacheHttp as jest.Mock).mockResolvedValue(mostPopularResponse);
    (getArticleById as jest.Mock).mockRejectedValue(error);

    const articles = await getMostPopular(10, params);

    expect(wrappedLogger.warn).toHaveBeenCalledWith(
      params.apiRequestId,
      expect.stringContaining("Most popular service level error"),
      error
    );
    expect(articles).toEqual([]);
  });
});
