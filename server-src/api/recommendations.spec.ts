import { ContentBlockType } from "../../common/__types__/ContentBlockType";
import { IBasicAdUnit } from "../../common/__types__/IBasicAdUnit";
import { IBasicArticleTitleUnit } from "../../common/__types__/IBasicArticleTitleUnit";
import { IBasicArticleUnit } from "../../common/__types__/IBasicArticleUnit";
import { IRawArticle } from "../services/adapters/__types__/IRawArticle";
import { getRecommendedArticles } from "../services/adapters/recommendations/recommendations.service";
import { getHomePageRecommendations } from "./recommendations";

jest.mock("../services/adapters/recommendations/recommendations.service");

describe("Recommendations", () => {
  const res = {
    json: jest.fn(),
    sendStatus: jest.fn(),
    end: jest.fn()
  } as any;

  const articlesWithIds = (ids: number[]) =>
    ids.map((id) => ({ id: `${id}` } as IRawArticle));

  const expectBasicArticleWithId = (id: number) =>
    expect.objectContaining({
      type: ContentBlockType.BasicArticleUnit,
      id: `${id}`
    });

  const expectBasicArticleTitleWithId = (id: number) =>
    expect.objectContaining({
      type: ContentBlockType.BasicArticleTitleUnit,
      id: `${id}`
    });

  const adUnit: IBasicAdUnit = {
    type: ContentBlockType.BasicAdUnit,
    context: "Recommendations"
  };

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should get recommended articles as content blocks from recommendations api", async () => {
    const req = {
      spadeParams: { apiRequestId: "123123" },
      query: {
        segments: "rt=nanz;enth=amuh",
        totalBasicArticlesUnit: "1",
        totalBasicArticleTitleUnit: "2"
      }
    } as any;

    (getRecommendedArticles as jest.Mock).mockResolvedValue(
      articlesWithIds([1, 2, 3])
    );

    await getHomePageRecommendations(req, res);

    expect(getRecommendedArticles).toHaveBeenCalledWith(
      req.query.segments,
      3,
      req.spadeParams
    );

    expect(res.json).toHaveBeenCalledWith([
      adUnit,
      expectBasicArticleWithId(1),
      adUnit,
      expectBasicArticleTitleWithId(2),
      adUnit,
      expectBasicArticleTitleWithId(3),
      adUnit
    ]);
  });

  it("should return 2 basic articles and 3 title articles by default", async () => {
    const req = {
      spadeParams: { apiRequestId: "123123" },
      query: {
        segments: "rt=nanz;enth=amuh"
      }
    } as any;

    (getRecommendedArticles as jest.Mock).mockResolvedValue(
      articlesWithIds([1, 2, 3, 4, 5])
    );

    await getHomePageRecommendations(req, res);

    expect(res.json).toHaveBeenCalledWith([
      adUnit,
      expectBasicArticleWithId(1),
      adUnit,
      expectBasicArticleWithId(2),
      adUnit,
      expectBasicArticleTitleWithId(3),
      adUnit,
      expectBasicArticleTitleWithId(4),
      adUnit,
      expectBasicArticleTitleWithId(5),
      adUnit
    ]);
  });

  it("should return empty content blocks if recommendation API returns nothing", async () => {
    const req = {
      spadeParams: { apiRequestId: "123123" },
      query: {
        segments: "rt=nanz;enth=amuh",
        totalBasicArticlesUnit: "2",
        totalBasicArticleTitleUnit: "3"
      }
    } as any;

    (getRecommendedArticles as jest.Mock).mockResolvedValue([]);

    await getHomePageRecommendations(req, res);

    expect(res.json).toHaveBeenCalledWith([]);
  });
});
