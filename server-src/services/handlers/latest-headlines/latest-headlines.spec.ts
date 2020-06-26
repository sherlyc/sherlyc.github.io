import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { getRawArticles } from "../../adapters/article-retriever/article-retriever";
import { IRawArticle } from "../../adapters/__types__/IRawArticle";
import { Strap } from "../../strap";
import logger from "../../utils/logger";
import { IParams } from "../../__types__/IParams";
import { HandlerInputType } from "../__types__/HandlerInputType";
import { ILatestHeadlinesHandlerInput } from "../__types__/ILatestHeadlinesHandlerInput";
import latestHeadlines from "./latest-headlines";

jest.mock("../../adapters/article-retriever/article-retriever");
jest.mock("../../utils/logger");

describe("Latest Headlines", () => {
  const params: IParams = { apiRequestId: "123" };
  const handlerRunnerMock = jest.fn();

  const fakeRawArticles = (ids: number[]) =>
    ids.map((id) => ({ id: `${id}` } as IRawArticle));
  const expectArticle = (id: number) =>
    expect.objectContaining({ id: `${id}` });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should retrieve specified number of articles", async () => {
    (getRawArticles as jest.Mock).mockResolvedValue([]);
    const input: ILatestHeadlinesHandlerInput = {
      type: HandlerInputType.LatestHeadlines,
      sourceId: Strap.LatestNews,
      totalArticles: 7,
      displayName: "Latest Headlines",
      strapName: "homepageLatestHeadlines",
      color: "#ff433d"
    };

    await latestHeadlines(handlerRunnerMock, input, params);

    expect(getRawArticles).toHaveBeenCalledWith(
      input.sourceId,
      input.totalArticles,
      params
    );
  });

  it("should return empty when there's no article", async () => {
    (getRawArticles as jest.Mock).mockResolvedValue([]);
    const input: ILatestHeadlinesHandlerInput = {
      type: HandlerInputType.LatestHeadlines,
      sourceId: Strap.LatestNews,
      totalArticles: 7,
      displayName: "Latest Headlines",
      strapName: "homepageLatestHeadlines",
      color: "#ff433d"
    };
    const result = await latestHeadlines(handlerRunnerMock, input, params);

    expect(result).toEqual([]);

    expect(logger.warn).toHaveBeenCalledWith(
      params.apiRequestId,
      "No articles retrieved from latest headline list"
    );
  });

  it("should return vertical article list with article content", async () => {
    (getRawArticles as jest.Mock).mockResolvedValue(fakeRawArticles([3, 2, 1]));

    const input: ILatestHeadlinesHandlerInput = {
      type: HandlerInputType.LatestHeadlines,
      sourceId: Strap.LatestNews,
      totalArticles: 7,
      displayName: "Latest Headlines",
      strapName: "homepageLatestHeadlines",
      color: "#ff433d"
    };

    const result = await latestHeadlines(handlerRunnerMock, input, params);

    expect(result).toEqual([
      {
        type: ContentBlockType.VerticalArticleList,
        articles: [expectArticle(3), expectArticle(2), expectArticle(1)],
        displayName: input.displayName,
        strapName: input.strapName,
        color: input.color
      }
    ]);
  });
});
