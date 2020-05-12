import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { IParams } from "../../../__types__/IParams";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { ITopStoriesV2HandlerInput } from "../../__types__/ITopStoriesV2HandlerInput";
import { Strap } from "../../../strap";
import topStoriesV2 from "./top-stories-v2";
import {
  ITopStoriesV2GridHandlerInput,
  TopStoriesV2GridPositions
} from "../../__types__/ITopStoriesV2GridHandlerInput";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import { IBasicAdUnit } from "../../../../../common/__types__/IBasicAdUnit";

jest.mock("../../../adapters/article-retriever/article-retriever");

describe("Top Stories V2", () => {
  const handlerRunnerMock = jest.fn();
  const params: IParams = { apiRequestId: "123" };
  const strapName = "Top Stories V2";
  const color = "blue";

  const handlerInput: ITopStoriesV2HandlerInput = {
    type: HandlerInputType.TopStoriesV2,
    strapName,
    color
  };

  const basicAdUnit: IBasicAdUnit = {
    type: ContentBlockType.BasicAdUnit,
    context: strapName
  };

  const fakeArticlesWithIds = (ids: number[]) =>
    ids.map((id) => ({ id: `${id}` } as IRawArticle));

  const expectBigImageArticle = (id: string) =>
    expect.objectContaining({
      type: ContentBlockType.BigImageArticleUnit,
      id
    });

  const expectFeaturedArticle = (id: string) =>
    expect.objectContaining({
      type: ContentBlockType.FeaturedArticle,
      id
    });

  const expectHalfWidthImage = (id: string) =>
    expect.objectContaining({
      type: ContentBlockType.HalfWidthImageArticleUnit,
      id
    });

  const expectBasicArticleTitle = (id: string) =>
    expect.objectContaining({
      type: ContentBlockType.BasicArticleTitleUnit,
      id
    });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should retrieve articles", async () => {
    await topStoriesV2(handlerRunnerMock, handlerInput, params);

    expect(getRawArticles).toHaveBeenCalledWith(Strap.TopStories, 9, params);
  });

  it("should call top stories v2 grid", async () => {
    (getRawArticles as jest.Mock).mockResolvedValue(
      fakeArticlesWithIds([1, 2, 3, 4, 5, 6, 7, 8, 9])
    );

    await topStoriesV2(handlerRunnerMock, handlerInput, params);

    const gridHandlerInput: ITopStoriesV2GridHandlerInput = {
      type: HandlerInputType.TopStoriesV2Grid,
      content: {
        [TopStoriesV2GridPositions.LeftHighlight]: [expectBigImageArticle("1")],
        [TopStoriesV2GridPositions.RightHighlight]: [
          expectFeaturedArticle("2")
        ],
        [TopStoriesV2GridPositions.BannerAd]: [
          { type: ContentBlockType.StickyContainer, items: [basicAdUnit] }
        ],
        [TopStoriesV2GridPositions.LeftOne]: [expectBigImageArticle("3")],
        [TopStoriesV2GridPositions.LeftTwo]: [expectBigImageArticle("4")],
        [TopStoriesV2GridPositions.LeftThree]: [expectBigImageArticle("5")],
        [TopStoriesV2GridPositions.LeftFour]: [basicAdUnit],
        [TopStoriesV2GridPositions.RightOne]: [expectHalfWidthImage("6")],
        [TopStoriesV2GridPositions.RightTwo]: [expectHalfWidthImage("7")],
        [TopStoriesV2GridPositions.RightThree]: [expectBasicArticleTitle("8")],
        [TopStoriesV2GridPositions.RightFour]: [expectBasicArticleTitle("9")]
      }
    };

    expect(handlerRunnerMock).toHaveBeenCalledWith(gridHandlerInput, params);
  });
});
