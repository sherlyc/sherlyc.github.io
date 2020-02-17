import { getMostPopular } from "./most-popular.service";
import { IParams } from "../../__types__/IParams";
import cacheHttp from "../../utils/cache-http";
import config from "../../utils/config";
import { getArticleById } from "../jsonfeed/jsonfeed";

jest.mock("../../utils/cache-http");
jest.mock("../jsonfeed/jsonfeed");

describe("Most popular service", function() {
  const params: IParams = {
    apiRequestId: "1"
  };
  const rawArticle = (id: string) => ({
    id
  });

  it("should get articles from most popular service", async () => {
    const limit = 10;
    (cacheHttp as jest.Mock).mockResolvedValue({
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
    });
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
});
