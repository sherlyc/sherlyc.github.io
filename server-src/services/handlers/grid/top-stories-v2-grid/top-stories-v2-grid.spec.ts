import { repeat } from "lodash-es";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { Border } from "../../../../../common/__types__/IGridContainer";
import { IParams } from "../../../__types__/IParams";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import {
  ITopStoriesV2GridHandlerInput,
  TopStoriesV2GridPositions
} from "../../__types__/ITopStoriesV2GridHandlerInput";
import topStoriesV2GridHandler from "./top-stories-v2-grid";

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
        [TopStoriesV2GridPositions.RightFour]: [fakeContentBlock],
        [TopStoriesV2GridPositions.RightFive]: [fakeContentBlock],
        [TopStoriesV2GridPositions.MidInsert]: [fakeContentBlock],
        [TopStoriesV2GridPositions.LowerRight]: [fakeContentBlock]
      }
    };

    const result = await topStoriesV2GridHandler(
      handlerRunnerMock,
      input,
      params
    );

    const mobile = {
      gridTemplateColumns: "1fr 1fr",
      gridTemplateRows: repeat(" auto", 12).substring(1),
      gridColumnGap: "20px",
      gridRowGap: "20px",
      gridBlocks: {
        [TopStoriesV2GridPositions.LeftHighlight]: {
          border: [Border.bottom],
          rowStart: 1,
          rowSpan: 1,
          columnStart: 1,
          columnSpan: 2
        },
        [TopStoriesV2GridPositions.RightHighlight]: {
          border: [Border.bottom],
          rowStart: 2,
          rowSpan: 1,
          columnStart: 1,
          columnSpan: 2
        },
        [TopStoriesV2GridPositions.BannerAd]: {
          border: [],
          rowStart: 3,
          rowSpan: 1,
          columnStart: 1,
          columnSpan: 2
        },
        [TopStoriesV2GridPositions.LeftOne]: {
          border: [Border.bottom],
          rowStart: 4,
          rowSpan: 1,
          columnStart: 1,
          columnSpan: 1
        },
        [TopStoriesV2GridPositions.LeftTwo]: {
          border: [Border.bottom],
          rowStart: 4,
          rowSpan: 1,
          columnStart: 2,
          columnSpan: 1
        },
        [TopStoriesV2GridPositions.LeftThree]: {
          border: [Border.bottom],
          rowStart: 5,
          rowSpan: 1,
          columnStart: 1,
          columnSpan: 1
        },
        [TopStoriesV2GridPositions.LeftFour]: {
          border: [Border.bottom],
          rowStart: 5,
          rowSpan: 1,
          columnStart: 2,
          columnSpan: 1
        },
        [TopStoriesV2GridPositions.RightOne]: {
          border: [Border.bottom],
          rowStart: 7,
          rowSpan: 1,
          columnStart: 1,
          columnSpan: 2
        },
        [TopStoriesV2GridPositions.RightTwo]: {
          border: [Border.bottom],
          rowStart: 8,
          rowSpan: 1,
          columnStart: 1,
          columnSpan: 2
        },
        [TopStoriesV2GridPositions.RightThree]: {
          border: [Border.bottom],
          rowStart: 9,
          rowSpan: 1,
          columnStart: 1,
          columnSpan: 2
        },
        [TopStoriesV2GridPositions.RightFour]: {
          border: [Border.bottom],
          rowStart: 10,
          rowSpan: 1,
          columnStart: 1,
          columnSpan: 2
        },
        [TopStoriesV2GridPositions.RightFive]: {
          border: [Border.bottom],
          rowStart: 11,
          rowSpan: 1,
          columnStart: 1,
          columnSpan: 2
        },
        [TopStoriesV2GridPositions.MidInsert]: {
          border: [Border.bottom],
          rowStart: 6,
          rowSpan: 1,
          columnStart: 1,
          columnSpan: 2
        },
        [TopStoriesV2GridPositions.LowerRight]: {
          border: [],
          rowStart: 12,
          rowSpan: 1,
          columnStart: 1,
          columnSpan: 2
        }
      }
    };

    const tablet = {
      gridTemplateColumns: "1fr 1fr 2fr",
      gridTemplateRows: repeat(" auto", 18).substring(1),
      gridColumnGap: "20px",
      gridRowGap: "20px",
      gridBlocks: {
        [TopStoriesV2GridPositions.LeftHighlight]: {
          border: [Border.bottom],
          rowStart: 1,
          rowSpan: 4,
          columnStart: 1,
          columnSpan: 2
        },
        [TopStoriesV2GridPositions.RightHighlight]: {
          border: [Border.bottom],
          rowStart: 1,
          rowSpan: 7,
          columnStart: 3,
          columnSpan: 1
        },
        [TopStoriesV2GridPositions.BannerAd]: {
          border: [],
          rowStart: 8,
          rowSpan: 7,
          columnStart: 3,
          columnSpan: 1
        },
        [TopStoriesV2GridPositions.LeftOne]: {
          border: [Border.bottom],
          rowStart: 5,
          rowSpan: 4,
          columnStart: 1,
          columnSpan: 1
        },
        [TopStoriesV2GridPositions.LeftTwo]: {
          border: [Border.bottom],
          rowStart: 5,
          rowSpan: 4,
          columnStart: 2,
          columnSpan: 1
        },
        [TopStoriesV2GridPositions.LeftThree]: {
          border: [Border.bottom],
          rowStart: 9,
          rowSpan: 4,
          columnStart: 1,
          columnSpan: 1
        },
        [TopStoriesV2GridPositions.LeftFour]: {
          border: [Border.bottom],
          rowStart: 9,
          rowSpan: 4,
          columnStart: 2,
          columnSpan: 1
        },
        [TopStoriesV2GridPositions.RightOne]: {
          border: [Border.bottom],
          rowStart: 14,
          rowSpan: 1,
          columnStart: 1,
          columnSpan: 2
        },
        [TopStoriesV2GridPositions.RightTwo]: {
          border: [Border.bottom],
          rowStart: 15,
          rowSpan: 1,
          columnStart: 1,
          columnSpan: 2
        },
        [TopStoriesV2GridPositions.RightThree]: {
          border: [Border.bottom],
          rowStart: 16,
          rowSpan: 1,
          columnStart: 1,
          columnSpan: 2
        },
        [TopStoriesV2GridPositions.RightFour]: {
          border: [Border.bottom],
          rowStart: 17,
          rowSpan: 1,
          columnStart: 1,
          columnSpan: 2
        },
        [TopStoriesV2GridPositions.RightFive]: {
          border: [Border.bottom],
          rowStart: 18,
          rowSpan: 1,
          columnStart: 1,
          columnSpan: 2
        },
        [TopStoriesV2GridPositions.MidInsert]: {
          border: [Border.bottom],
          rowStart: 13,
          rowSpan: 1,
          columnStart: 1,
          columnSpan: 2
        },
        [TopStoriesV2GridPositions.LowerRight]: {
          border: [],
          rowStart: 15,
          rowSpan: 4,
          columnStart: 3,
          columnSpan: 1
        }
      }
    };

    const desktop = {
      gridTemplateColumns: "1fr 1fr 2fr 300px",
      gridTemplateRows: repeat(" auto", 13).substring(1),
      gridColumnGap: "20px",
      gridRowGap: "20px",
      gridBlocks: {
        [TopStoriesV2GridPositions.LeftHighlight]: {
          border: [Border.bottom],
          columnStart: 1,
          columnSpan: 2,
          rowStart: 1,
          rowSpan: 5
        },
        [TopStoriesV2GridPositions.RightHighlight]: {
          border: [Border.bottom],
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
          rowSpan: 8
        },
        [TopStoriesV2GridPositions.LeftOne]: {
          border: [Border.bottom],
          columnStart: 1,
          columnSpan: 1,
          rowStart: 6,
          rowSpan: 4
        },
        [TopStoriesV2GridPositions.LeftTwo]: {
          border: [Border.bottom],
          columnStart: 2,
          columnSpan: 1,
          rowStart: 6,
          rowSpan: 4
        },
        [TopStoriesV2GridPositions.LeftThree]: {
          border: [Border.bottom],
          columnStart: 1,
          columnSpan: 1,
          rowStart: 11,
          rowSpan: 3
        },
        [TopStoriesV2GridPositions.LeftFour]: {
          border: [Border.bottom],
          columnStart: 2,
          columnSpan: 1,
          rowStart: 11,
          rowSpan: 3
        },
        [TopStoriesV2GridPositions.RightOne]: {
          border: [Border.bottom],
          columnStart: 3,
          columnSpan: 1,
          rowStart: 8,
          rowSpan: 1
        },
        [TopStoriesV2GridPositions.RightTwo]: {
          border: [Border.bottom],
          columnStart: 3,
          columnSpan: 1,
          rowStart: 9,
          rowSpan: 1
        },
        [TopStoriesV2GridPositions.RightThree]: {
          border: [Border.bottom],
          columnStart: 3,
          columnSpan: 1,
          rowStart: 11,
          rowSpan: 1
        },
        [TopStoriesV2GridPositions.RightFour]: {
          border: [Border.bottom],
          columnStart: 3,
          columnSpan: 1,
          rowStart: 12,
          rowSpan: 1
        },
        [TopStoriesV2GridPositions.RightFive]: {
          border: [Border.bottom],
          columnStart: 3,
          columnSpan: 1,
          rowStart: 13,
          rowSpan: 1
        },
        [TopStoriesV2GridPositions.MidInsert]: {
          border: [],
          columnStart: 1,
          columnSpan: 3,
          rowStart: 10,
          rowSpan: 1
        },
        [TopStoriesV2GridPositions.LowerRight]: {
          border: [],
          columnStart: 4,
          columnSpan: 1,
          rowStart: 9,
          rowSpan: 5
        }
      }
    };

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
          [TopStoriesV2GridPositions.RightFour]: [fakeContentBlock],
          [TopStoriesV2GridPositions.RightFive]: [fakeContentBlock],
          [TopStoriesV2GridPositions.MidInsert]: [fakeContentBlock],
          [TopStoriesV2GridPositions.LowerRight]: [fakeContentBlock]
        },
        mobile,
        tablet,
        desktop
      }
    ]);
  });
});
