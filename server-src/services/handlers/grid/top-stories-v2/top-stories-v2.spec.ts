import { AspectRatio } from "../../../../../common/AspectRatio";
import { AccentColor } from "../../../../../common/__types__/AccentColor";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IBasicAdUnit } from "../../../../../common/__types__/IBasicAdUnit";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { Orientation } from "../../../../../common/__types__/IHomepageArticle";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import { Strap } from "../../../strap";
import { IParams } from "../../../__types__/IParams";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import {
  ITopStoriesV2DefaultGridHandlerInput,
  TopStoriesV2DefaultGridPositions
} from "../../__types__/ITopStoriesV2DefaultGridHandlerInput";
import { ITopStoriesV2HandlerInput } from "../../__types__/ITopStoriesV2HandlerInput";
import topStoriesV2 from "./top-stories-v2";

jest.mock("../../../adapters/article-retriever/article-retriever");

describe("Top Stories V2", () => {
  const handlerRunnerMock = jest.fn();
  const params: IParams = { apiRequestId: "123" };
  const strapName = "Top Stories V2";
  const color = AccentColor.CuriousBlue;
  const handlerInput: ITopStoriesV2HandlerInput = {
    type: HandlerInputType.TopStoriesV2,
    strapName,
    color,
    midInsertContent: {
      type: HandlerInputType.ExternalContent,
      url:
        "https://interactives.stuff.co.nz/live/homepage/uber/corona/320-200.html",
      width: "100%",
      height: "43px",
      margin: "0"
    },
    lowerRightContent: {
      type: HandlerInputType.LatestHeadlines,
      sourceId: Strap.LatestNews,
      totalArticles: 7,
      displayName: "latest headlines",
      strapName: `homepageLatestHeadlines`,
      color: "#ff433d"
    }
  };

  const basicAdUnit: IBasicAdUnit = {
    type: ContentBlockType.BasicAdUnit,
    context: strapName
  };

  const fakeArticlesWithIds = (ids: number[]) =>
    ids.map(
      (id) =>
        ({
          id: `${id}`,
          imageSrc: `${id}.jpg`,
          sixteenByNineSrc: `${id}.16:9.jpg`,
          portraitImageSrc: `${id}.3:4.jpg`,
          introText: `${id} intro`
        } as IRawArticle)
    );

  const expectContentBlock = (
    props: Partial<IContentBlock> & Pick<IContentBlock, "type">
  ) => expect.objectContaining(props);

  beforeEach(() => {
    jest.resetAllMocks();
    handlerRunnerMock.mockImplementation(({ type }) => {
      switch (type) {
        case HandlerInputType.ExternalContent:
          return [{ type: ContentBlockType.ExternalContentUnit }];
        case HandlerInputType.LatestHeadlines:
          return [{ type: ContentBlockType.VerticalArticleList }];
      }
    });
  });

  it("should retrieve articles", async () => {
    (getRawArticles as jest.Mock).mockResolvedValue(
      fakeArticlesWithIds([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    );

    await topStoriesV2(handlerRunnerMock, handlerInput, params);

    expect(getRawArticles).toHaveBeenCalledWith(Strap.TopStories, 10, params);
  });

  it("should call top stories v2 default grid with correct content blocks", async () => {
    (getRawArticles as jest.Mock).mockResolvedValue(
      fakeArticlesWithIds([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    );

    await topStoriesV2(handlerRunnerMock, handlerInput, params);

    const gridHandlerInput: ITopStoriesV2DefaultGridHandlerInput = {
      type: HandlerInputType.TopStoriesV2DefaultGrid,
      content: {
        [TopStoriesV2DefaultGridPositions.RightHighlight]: [
          expectContentBlock({
            type: ContentBlockType.HomepageHighlightArticle,
            id: "1",
            image: {
              mobile: {
                src: "1.3:4.jpg",
                aspectRatio: AspectRatio.OneByOne
              }
            }
          })
        ],
        [TopStoriesV2DefaultGridPositions.LeftHighlight]: [
          expectContentBlock({
            type: ContentBlockType.HomepageHighlightArticle,
            id: "2",
            image: {
              mobile: {
                src: "2.16:9.jpg",
                aspectRatio: AspectRatio.SixteenByNine
              }
            }
          })
        ],
        [TopStoriesV2DefaultGridPositions.BannerAd]: [
          { type: ContentBlockType.StickyContainer, items: [basicAdUnit] }
        ],
        [TopStoriesV2DefaultGridPositions.TopOne]: [
          expectContentBlock({
            type: ContentBlockType.HomepageArticle,
            id: "3",
            orientation: {
              mobile: Orientation.Portrait,
              tablet: Orientation.Portrait,
              desktop: Orientation.Portrait
            },
            imageSrc: "3.16:9.jpg",
            introText: "3 intro"
          })
        ],
        [TopStoriesV2DefaultGridPositions.TopTwo]: [
          expectContentBlock({
            type: ContentBlockType.HomepageArticle,
            id: "4",
            orientation: {
              mobile: Orientation.Portrait,
              tablet: Orientation.Portrait,
              desktop: Orientation.Portrait
            },
            imageSrc: "4.16:9.jpg",
            introText: "4 intro"
          })
        ],
        [TopStoriesV2DefaultGridPositions.TopThree]: [
          expectContentBlock({
            type: ContentBlockType.HomepageArticle,
            id: "5",
            orientation: {
              mobile: Orientation.Landscape,
              tablet: Orientation.Landscape,
              desktop: Orientation.Landscape
            },
            imageSrc: "5.16:9.jpg",
            introText: undefined
          })
        ],
        [TopStoriesV2DefaultGridPositions.TopFour]: [
          expectContentBlock({
            type: ContentBlockType.HomepageArticle,
            id: "6",
            orientation: {
              mobile: Orientation.Landscape,
              tablet: Orientation.Landscape,
              desktop: Orientation.Landscape
            },
            imageSrc: "6.16:9.jpg",
            introText: undefined
          })
        ],
        [TopStoriesV2DefaultGridPositions.BottomOne]: [
          expectContentBlock({
            type: ContentBlockType.HomepageArticle,
            id: "7",
            orientation: {
              mobile: Orientation.Portrait,
              tablet: Orientation.Portrait,
              desktop: Orientation.Portrait
            },
            imageSrc: "7.16:9.jpg",
            introText: "7 intro"
          })
        ],
        [TopStoriesV2DefaultGridPositions.BottomTwo]: [basicAdUnit],
        [TopStoriesV2DefaultGridPositions.BottomThree]: [
          expectContentBlock({
            type: ContentBlockType.HomepageArticle,
            id: "8",
            orientation: {
              mobile: Orientation.Portrait,
              tablet: Orientation.Portrait,
              desktop: Orientation.Portrait
            },
            imageSrc: undefined,
            introText: "8 intro"
          })
        ],
        [TopStoriesV2DefaultGridPositions.BottomFour]: [
          expectContentBlock({
            type: ContentBlockType.HomepageArticle,
            id: "9",
            orientation: {
              mobile: Orientation.Portrait,
              tablet: Orientation.Portrait,
              desktop: Orientation.Portrait
            },
            imageSrc: undefined,
            introText: "9 intro"
          })
        ],
        [TopStoriesV2DefaultGridPositions.BottomFive]: [
          expectContentBlock({
            type: ContentBlockType.HomepageArticle,
            id: "10",
            orientation: {
              mobile: Orientation.Portrait,
              tablet: Orientation.Portrait,
              desktop: Orientation.Portrait
            },
            imageSrc: undefined,
            introText: "10 intro"
          })
        ],
        [TopStoriesV2DefaultGridPositions.MidInsert]: [
          expectContentBlock({
            type: ContentBlockType.ExternalContentUnit
          })
        ],
        [TopStoriesV2DefaultGridPositions.LowerRight]: [
          expectContentBlock({
            type: ContentBlockType.VerticalArticleList
          })
        ]
      }
    };

    expect(handlerRunnerMock).toHaveBeenLastCalledWith(
      gridHandlerInput,
      params
    );
  });
});
