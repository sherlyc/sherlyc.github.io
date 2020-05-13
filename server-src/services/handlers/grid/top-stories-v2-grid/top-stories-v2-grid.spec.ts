import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import {
  ITopStoriesV2GridHandlerInput,
  TopStoriesV2GridPositions
} from "../../__types__/ITopStoriesV2GridHandlerInput";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import topStoriesV2GridHandler from "./top-stories-v2-grid";
import { IParams } from "../../../__types__/IParams";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { Border } from "../../../../../common/__types__/IGridContainer";

describe("Top Stories V2 Grid Handler", () => {
  const handlerRunnerMock = jest.fn();
  const params = {} as IParams;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should generate the grid with correct values", async () => {
    const fakeContentBlock = {} as IContentBlock;

    const input: ITopStoriesV2GridHandlerInput = {
      type: HandlerInputType.TopStoriesV2Grid,
      content: {
        [TopStoriesV2GridPositions.LeftHighlight]: [fakeContentBlock],
        [TopStoriesV2GridPositions.RightHighlight]: [fakeContentBlock],
        [TopStoriesV2GridPositions.BannerAd]: [fakeContentBlock],
        [TopStoriesV2GridPositions.LeftOne]: [fakeContentBlock],
        [TopStoriesV2GridPositions.LeftTwo]: [fakeContentBlock],
        [TopStoriesV2GridPositions.LeftThree]: [fakeContentBlock],
        [TopStoriesV2GridPositions.LeftFour]: [fakeContentBlock],
        [TopStoriesV2GridPositions.RightOne]: [fakeContentBlock],
        [TopStoriesV2GridPositions.RightTwo]: [fakeContentBlock],
        [TopStoriesV2GridPositions.RightThree]: [fakeContentBlock],
        [TopStoriesV2GridPositions.RightFour]: [fakeContentBlock]
      }
    };

    const result = await topStoriesV2GridHandler(
      handlerRunnerMock,
      input,
      params
    );

    expect(result).toEqual([
      {
        type: ContentBlockType.GridContainer,
        items: {
          [TopStoriesV2GridPositions.LeftHighlight]: [fakeContentBlock],
          [TopStoriesV2GridPositions.RightHighlight]: [fakeContentBlock],
          [TopStoriesV2GridPositions.BannerAd]: [fakeContentBlock],
          [TopStoriesV2GridPositions.LeftOne]: [fakeContentBlock],
          [TopStoriesV2GridPositions.LeftTwo]: [fakeContentBlock],
          [TopStoriesV2GridPositions.LeftThree]: [fakeContentBlock],
          [TopStoriesV2GridPositions.LeftFour]: [fakeContentBlock],
          [TopStoriesV2GridPositions.RightOne]: [fakeContentBlock],
          [TopStoriesV2GridPositions.RightTwo]: [fakeContentBlock],
          [TopStoriesV2GridPositions.RightThree]: [fakeContentBlock],
          [TopStoriesV2GridPositions.RightFour]: [fakeContentBlock]
        },
        mobile: {
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "auto auto auto auto auto auto auto auto auto",
          gridColumnGap: "20px",
          gridRowGap: "20px",
          gridBlocks: {
            [TopStoriesV2GridPositions.LeftHighlight]: {
              border: [Border.bottom],
              columnStart: 1,
              columnSpan: 2,
              rowStart: 1,
              rowSpan: 1
            },
            [TopStoriesV2GridPositions.RightHighlight]: {
              border: [Border.bottom],
              columnStart: 1,
              columnSpan: 2,
              rowStart: 2,
              rowSpan: 1
            },
            [TopStoriesV2GridPositions.BannerAd]: {
              border: [],
              columnStart: 1,
              columnSpan: 2,
              rowStart: 3,
              rowSpan: 1
            },
            [TopStoriesV2GridPositions.LeftOne]: {
              border: [Border.bottom],
              columnStart: 1,
              columnSpan: 1,
              rowStart: 4,
              rowSpan: 1
            },
            [TopStoriesV2GridPositions.LeftTwo]: {
              border: [Border.bottom],
              columnStart: 2,
              columnSpan: 1,
              rowStart: 4,
              rowSpan: 1
            },
            [TopStoriesV2GridPositions.LeftThree]: {
              border: [Border.bottom],
              columnStart: 1,
              columnSpan: 1,
              rowStart: 5,
              rowSpan: 1
            },
            [TopStoriesV2GridPositions.LeftFour]: {
              border: [Border.bottom],
              columnStart: 2,
              columnSpan: 1,
              rowStart: 5,
              rowSpan: 1
            },
            [TopStoriesV2GridPositions.RightOne]: {
              border: [Border.bottom],
              columnStart: 1,
              columnSpan: 2,
              rowStart: 6,
              rowSpan: 1
            },
            [TopStoriesV2GridPositions.RightTwo]: {
              border: [Border.bottom],
              columnStart: 1,
              columnSpan: 2,
              rowStart: 7,
              rowSpan: 1
            },
            [TopStoriesV2GridPositions.RightThree]: {
              border: [Border.bottom],
              columnStart: 1,
              columnSpan: 2,
              rowStart: 8,
              rowSpan: 1
            },
            [TopStoriesV2GridPositions.RightFour]: {
              border: [Border.bottom],
              columnStart: 1,
              columnSpan: 2,
              rowStart: 9,
              rowSpan: 1
            }
          }
        },
        desktop: {
          gridTemplateColumns: "1fr 1fr 2fr 300px",
          gridTemplateRows: "auto auto auto auto auto auto auto auto auto auto auto",
          gridColumnGap: "20px",
          gridRowGap: "20px",
          gridBlocks: {
            [TopStoriesV2GridPositions.LeftHighlight]: {
              border: [],
              columnStart: 1,
              columnSpan: 2,
              rowStart: 1,
              rowSpan: 4
            },
            [TopStoriesV2GridPositions.RightHighlight]: {
              border: [],
              columnStart: 3,
              columnSpan: 1,
              rowStart: 1,
              rowSpan: 7
            },
            [TopStoriesV2GridPositions.BannerAd]: {
              border: [],
              columnStart: 4,
              columnSpan: 1,
              rowStart: 1,
              rowSpan: 11
            },
            [TopStoriesV2GridPositions.LeftOne]: {
              border: [],
              columnStart: 1,
              columnSpan: 1,
              rowStart: 5,
              rowSpan: 4
            },
            [TopStoriesV2GridPositions.LeftTwo]: {
              border: [],
              columnStart: 2,
              columnSpan: 1,
              rowStart: 5,
              rowSpan: 4
            },
            [TopStoriesV2GridPositions.LeftThree]: {
              border: [],
              columnStart: 1,
              columnSpan: 1,
              rowStart: 9,
              rowSpan: 2
            },
            [TopStoriesV2GridPositions.LeftFour]: {
              border: [],
              columnStart: 2,
              columnSpan: 1,
              rowStart: 9,
              rowSpan: 2
            },
            [TopStoriesV2GridPositions.RightOne]: {
              border: [],
              columnStart: 3,
              columnSpan: 1,
              rowStart: 8,
              rowSpan: 1
            },
            [TopStoriesV2GridPositions.RightTwo]: {
              border: [],
              columnStart: 3,
              columnSpan: 1,
              rowStart: 9,
              rowSpan: 1
            },
            [TopStoriesV2GridPositions.RightThree]: {
              border: [],
              columnStart: 3,
              columnSpan: 1,
              rowStart: 10,
              rowSpan: 1
            },
            [TopStoriesV2GridPositions.RightFour]: {
              border: [],
              columnStart: 3,
              columnSpan: 1,
              rowStart: 11,
              rowSpan: 1
            }
          }
        }
      }
    ]);
  });
});
