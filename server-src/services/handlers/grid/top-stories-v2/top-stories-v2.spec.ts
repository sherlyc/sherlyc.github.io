import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IBasicAdUnit } from "../../../../../common/__types__/IBasicAdUnit";
import { IParams } from "../../../__types__/IParams";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { Strap } from "../../../strap";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import {
  ITopStoriesV2GridHandlerInput,
  TopStoriesV2GridPositions
} from "../../__types__/ITopStoriesV2GridHandlerInput";
import { ITopStoriesV2HandlerInput } from "../../__types__/ITopStoriesV2HandlerInput";
import topStoriesV2 from "./top-stories-v2";

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

  const expectContent = (type: ContentBlockType, id: string) =>
    expect.objectContaining({
      type: type,
      id
    });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should retrieve articles", async () => {
    await topStoriesV2(handlerRunnerMock, handlerInput, params);

    expect(getRawArticles).toHaveBeenCalledWith(Strap.TopStories, 9, params);
  });

  it("should call top stories v2 grid with correct content blocks", async () => {
    (getRawArticles as jest.Mock).mockResolvedValue(
      fakeArticlesWithIds([1, 2, 3, 4, 5, 6, 7, 8, 9])
    );

    await topStoriesV2(handlerRunnerMock, handlerInput, params);

    const gridHandlerInput: ITopStoriesV2GridHandlerInput = {
      type: HandlerInputType.TopStoriesV2Grid,
      content: {
        [TopStoriesV2GridPositions.LeftHighlight]: [
          expectContent(ContentBlockType.BigImageArticleUnit, "1")
        ],
        [TopStoriesV2GridPositions.RightHighlight]: [
          expectContent(ContentBlockType.FeaturedArticle, "2")
        ],
        [TopStoriesV2GridPositions.BannerAd]: [
          { type: ContentBlockType.StickyContainer, items: [basicAdUnit] }
        ],
        [TopStoriesV2GridPositions.LeftOne]: [
          expectContent(ContentBlockType.HomepageArticle, "3")
        ],
        [TopStoriesV2GridPositions.LeftTwo]: [
          expectContent(ContentBlockType.HomepageArticle, "4")
        ],
        [TopStoriesV2GridPositions.LeftThree]: [
          expectContent(ContentBlockType.HomepageArticle, "5")
        ],
        [TopStoriesV2GridPositions.LeftFour]: [basicAdUnit],
        [TopStoriesV2GridPositions.RightOne]: [
          expectContent(ContentBlockType.HomepageArticle, "6")
        ],
        [TopStoriesV2GridPositions.RightTwo]: [
          expectContent(ContentBlockType.HomepageArticle, "7")
        ],
        [TopStoriesV2GridPositions.RightThree]: [
          expectContent(ContentBlockType.HomepageArticle, "8")
        ],
        [TopStoriesV2GridPositions.RightFour]: [
          expectContent(ContentBlockType.HomepageArticle, "9")
        ]
      }
    };

    expect(handlerRunnerMock).toHaveBeenCalledWith(gridHandlerInput, params);
  });
});
