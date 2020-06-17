import { repeat } from "lodash-es";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { Border } from "../../../../../common/__types__/IGridContainer";
import { IParams } from "../../../__types__/IParams";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import {
  ITopStoriesV2DefaultGridHandlerInput,
  TopStoriesV2DefaultGridPositions
} from "../../__types__/ITopStoriesV2DefaultGridHandlerInput";
import topStoriesV2DefaultGridHandler from "./top-stories-v2-default-grid";

describe("Top Stories V2 Grid Handler", () => {
  const handlerRunnerMock = jest.fn();
  const params = {} as IParams;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should generate the grid with correct values", async () => {
    const fakeContentBlock = {} as IContentBlock;

    const input: ITopStoriesV2DefaultGridHandlerInput = {
      type: HandlerInputType.TopStoriesV2DefaultGrid,
      content: {
        [TopStoriesV2DefaultGridPositions.LeftHighlight]: [fakeContentBlock],
        [TopStoriesV2DefaultGridPositions.RightHighlight]: [fakeContentBlock],
        [TopStoriesV2DefaultGridPositions.BannerAd]: [fakeContentBlock],
        [TopStoriesV2DefaultGridPositions.LeftOne]: [fakeContentBlock],
        [TopStoriesV2DefaultGridPositions.LeftTwo]: [fakeContentBlock],
        [TopStoriesV2DefaultGridPositions.LeftThree]: [fakeContentBlock],
        [TopStoriesV2DefaultGridPositions.LeftFour]: [fakeContentBlock],
        [TopStoriesV2DefaultGridPositions.RightOne]: [fakeContentBlock],
        [TopStoriesV2DefaultGridPositions.RightTwo]: [fakeContentBlock],
        [TopStoriesV2DefaultGridPositions.RightThree]: [fakeContentBlock],
        [TopStoriesV2DefaultGridPositions.RightFour]: [fakeContentBlock],
        [TopStoriesV2DefaultGridPositions.RightFive]: [fakeContentBlock],
        [TopStoriesV2DefaultGridPositions.MidInsert]: [fakeContentBlock],
        [TopStoriesV2DefaultGridPositions.LowerRight]: [fakeContentBlock]
      }
    };

    const result = await topStoriesV2DefaultGridHandler(
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
        [TopStoriesV2DefaultGridPositions.LeftHighlight]: {
          border: [Border.bottom],
          rowStart: 1,
          rowSpan: 1,
          columnStart: 1,
          columnSpan: 2
        },
        [TopStoriesV2DefaultGridPositions.RightHighlight]: {
          border: [Border.bottom],
          rowStart: 2,
          rowSpan: 1,
          columnStart: 1,
          columnSpan: 2
        },
        [TopStoriesV2DefaultGridPositions.BannerAd]: {
          border: [],
          rowStart: 3,
          rowSpan: 1,
          columnStart: 1,
          columnSpan: 2
        },
        [TopStoriesV2DefaultGridPositions.LeftOne]: {
          border: [Border.bottom],
          rowStart: 4,
          rowSpan: 1,
          columnStart: 1,
          columnSpan: 1
        },
        [TopStoriesV2DefaultGridPositions.LeftTwo]: {
          border: [Border.bottom],
          rowStart: 4,
          rowSpan: 1,
          columnStart: 2,
          columnSpan: 1
        },
        [TopStoriesV2DefaultGridPositions.LeftThree]: {
          border: [Border.bottom],
          rowStart: 5,
          rowSpan: 1,
          columnStart: 1,
          columnSpan: 1
        },
        [TopStoriesV2DefaultGridPositions.LeftFour]: {
          border: [Border.bottom],
          rowStart: 5,
          rowSpan: 1,
          columnStart: 2,
          columnSpan: 1
        },
        [TopStoriesV2DefaultGridPositions.RightOne]: {
          border: [Border.bottom],
          rowStart: 7,
          rowSpan: 1,
          columnStart: 1,
          columnSpan: 2
        },
        [TopStoriesV2DefaultGridPositions.RightTwo]: {
          border: [Border.bottom],
          rowStart: 8,
          rowSpan: 1,
          columnStart: 1,
          columnSpan: 2
        },
        [TopStoriesV2DefaultGridPositions.RightThree]: {
          border: [Border.bottom],
          rowStart: 9,
          rowSpan: 1,
          columnStart: 1,
          columnSpan: 2
        },
        [TopStoriesV2DefaultGridPositions.RightFour]: {
          border: [Border.bottom],
          rowStart: 10,
          rowSpan: 1,
          columnStart: 1,
          columnSpan: 2
        },
        [TopStoriesV2DefaultGridPositions.RightFive]: {
          border: [Border.bottom],
          rowStart: 11,
          rowSpan: 1,
          columnStart: 1,
          columnSpan: 2
        },
        [TopStoriesV2DefaultGridPositions.MidInsert]: {
          border: [Border.bottom],
          rowStart: 6,
          rowSpan: 1,
          columnStart: 1,
          columnSpan: 2
        },
        [TopStoriesV2DefaultGridPositions.LowerRight]: {
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
        [TopStoriesV2DefaultGridPositions.LeftHighlight]: {
          border: [Border.bottom],
          rowStart: 1,
          rowSpan: 4,
          columnStart: 1,
          columnSpan: 2
        },
        [TopStoriesV2DefaultGridPositions.RightHighlight]: {
          border: [Border.bottom],
          rowStart: 1,
          rowSpan: 7,
          columnStart: 3,
          columnSpan: 1
        },
        [TopStoriesV2DefaultGridPositions.BannerAd]: {
          border: [],
          rowStart: 8,
          rowSpan: 7,
          columnStart: 3,
          columnSpan: 1
        },
        [TopStoriesV2DefaultGridPositions.LeftOne]: {
          border: [Border.bottom],
          rowStart: 5,
          rowSpan: 4,
          columnStart: 1,
          columnSpan: 1
        },
        [TopStoriesV2DefaultGridPositions.LeftTwo]: {
          border: [Border.bottom],
          rowStart: 5,
          rowSpan: 4,
          columnStart: 2,
          columnSpan: 1
        },
        [TopStoriesV2DefaultGridPositions.LeftThree]: {
          border: [Border.bottom],
          rowStart: 9,
          rowSpan: 4,
          columnStart: 1,
          columnSpan: 1
        },
        [TopStoriesV2DefaultGridPositions.LeftFour]: {
          border: [Border.bottom],
          rowStart: 9,
          rowSpan: 4,
          columnStart: 2,
          columnSpan: 1
        },
        [TopStoriesV2DefaultGridPositions.RightOne]: {
          border: [Border.bottom],
          rowStart: 14,
          rowSpan: 1,
          columnStart: 1,
          columnSpan: 2
        },
        [TopStoriesV2DefaultGridPositions.RightTwo]: {
          border: [Border.bottom],
          rowStart: 15,
          rowSpan: 1,
          columnStart: 1,
          columnSpan: 2
        },
        [TopStoriesV2DefaultGridPositions.RightThree]: {
          border: [Border.bottom],
          rowStart: 16,
          rowSpan: 1,
          columnStart: 1,
          columnSpan: 2
        },
        [TopStoriesV2DefaultGridPositions.RightFour]: {
          border: [Border.bottom],
          rowStart: 17,
          rowSpan: 1,
          columnStart: 1,
          columnSpan: 2
        },
        [TopStoriesV2DefaultGridPositions.RightFive]: {
          border: [Border.bottom],
          rowStart: 18,
          rowSpan: 1,
          columnStart: 1,
          columnSpan: 2
        },
        [TopStoriesV2DefaultGridPositions.MidInsert]: {
          border: [Border.bottom],
          rowStart: 13,
          rowSpan: 1,
          columnStart: 1,
          columnSpan: 2
        },
        [TopStoriesV2DefaultGridPositions.LowerRight]: {
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
        [TopStoriesV2DefaultGridPositions.LeftHighlight]: {
          border: [Border.bottom],
          columnStart: 1,
          columnSpan: 2,
          rowStart: 1,
          rowSpan: 5
        },
        [TopStoriesV2DefaultGridPositions.RightHighlight]: {
          border: [Border.bottom],
          columnStart: 3,
          columnSpan: 1,
          rowStart: 1,
          rowSpan: 7
        },
        [TopStoriesV2DefaultGridPositions.BannerAd]: {
          border: [],
          columnStart: 4,
          columnSpan: 1,
          rowStart: 1,
          rowSpan: 8
        },
        [TopStoriesV2DefaultGridPositions.LeftOne]: {
          border: [Border.bottom],
          columnStart: 1,
          columnSpan: 1,
          rowStart: 6,
          rowSpan: 4
        },
        [TopStoriesV2DefaultGridPositions.LeftTwo]: {
          border: [Border.bottom],
          columnStart: 2,
          columnSpan: 1,
          rowStart: 6,
          rowSpan: 4
        },
        [TopStoriesV2DefaultGridPositions.LeftThree]: {
          border: [Border.bottom],
          columnStart: 1,
          columnSpan: 1,
          rowStart: 11,
          rowSpan: 3
        },
        [TopStoriesV2DefaultGridPositions.LeftFour]: {
          border: [Border.bottom],
          columnStart: 2,
          columnSpan: 1,
          rowStart: 11,
          rowSpan: 3
        },
        [TopStoriesV2DefaultGridPositions.RightOne]: {
          border: [Border.bottom],
          columnStart: 3,
          columnSpan: 1,
          rowStart: 8,
          rowSpan: 1
        },
        [TopStoriesV2DefaultGridPositions.RightTwo]: {
          border: [Border.bottom],
          columnStart: 3,
          columnSpan: 1,
          rowStart: 9,
          rowSpan: 1
        },
        [TopStoriesV2DefaultGridPositions.RightThree]: {
          border: [Border.bottom],
          columnStart: 3,
          columnSpan: 1,
          rowStart: 11,
          rowSpan: 1
        },
        [TopStoriesV2DefaultGridPositions.RightFour]: {
          border: [Border.bottom],
          columnStart: 3,
          columnSpan: 1,
          rowStart: 12,
          rowSpan: 1
        },
        [TopStoriesV2DefaultGridPositions.RightFive]: {
          border: [Border.bottom],
          columnStart: 3,
          columnSpan: 1,
          rowStart: 13,
          rowSpan: 1
        },
        [TopStoriesV2DefaultGridPositions.MidInsert]: {
          border: [],
          columnStart: 1,
          columnSpan: 3,
          rowStart: 10,
          rowSpan: 1
        },
        [TopStoriesV2DefaultGridPositions.LowerRight]: {
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
          [TopStoriesV2DefaultGridPositions.LeftHighlight]: [fakeContentBlock],
          [TopStoriesV2DefaultGridPositions.RightHighlight]: [fakeContentBlock],
          [TopStoriesV2DefaultGridPositions.BannerAd]: [fakeContentBlock],
          [TopStoriesV2DefaultGridPositions.LeftOne]: [fakeContentBlock],
          [TopStoriesV2DefaultGridPositions.LeftTwo]: [fakeContentBlock],
          [TopStoriesV2DefaultGridPositions.LeftThree]: [fakeContentBlock],
          [TopStoriesV2DefaultGridPositions.LeftFour]: [fakeContentBlock],
          [TopStoriesV2DefaultGridPositions.RightOne]: [fakeContentBlock],
          [TopStoriesV2DefaultGridPositions.RightTwo]: [fakeContentBlock],
          [TopStoriesV2DefaultGridPositions.RightThree]: [fakeContentBlock],
          [TopStoriesV2DefaultGridPositions.RightFour]: [fakeContentBlock],
          [TopStoriesV2DefaultGridPositions.RightFive]: [fakeContentBlock],
          [TopStoriesV2DefaultGridPositions.MidInsert]: [fakeContentBlock],
          [TopStoriesV2DefaultGridPositions.LowerRight]: [fakeContentBlock]
        },
        mobile,
        tablet,
        desktop
      }
    ]);
  });
});
