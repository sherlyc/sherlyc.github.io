import { repeat } from "lodash-es";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import {
  Border,
  GridContainerVariation
} from "../../../../../common/__types__/IGridContainer";
import { gridBlock } from "../../../adapters/grid/grid-block";
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
        [TopStoriesV2DefaultGridPositions.TopOne]: [fakeContentBlock],
        [TopStoriesV2DefaultGridPositions.TopTwo]: [fakeContentBlock],
        [TopStoriesV2DefaultGridPositions.TopThree]: [fakeContentBlock],
        [TopStoriesV2DefaultGridPositions.TopFour]: [fakeContentBlock],
        [TopStoriesV2DefaultGridPositions.BottomOne]: [fakeContentBlock],
        [TopStoriesV2DefaultGridPositions.BottomTwo]: [fakeContentBlock],
        [TopStoriesV2DefaultGridPositions.BottomThree]: [fakeContentBlock],
        [TopStoriesV2DefaultGridPositions.BottomFour]: [fakeContentBlock],
        [TopStoriesV2DefaultGridPositions.BottomFive]: [fakeContentBlock],
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
        [TopStoriesV2DefaultGridPositions.LeftHighlight]: gridBlock(
          1,
          1,
          1,
          2,
          []
        ),
        [TopStoriesV2DefaultGridPositions.RightHighlight]: gridBlock(
          2,
          1,
          1,
          2,
          []
        ),
        [TopStoriesV2DefaultGridPositions.BannerAd]: gridBlock(3, 1, 1, 2, []),
        [TopStoriesV2DefaultGridPositions.TopOne]: gridBlock(4, 1, 1, 1, []),
        [TopStoriesV2DefaultGridPositions.TopTwo]: gridBlock(4, 2, 1, 1, []),
        [TopStoriesV2DefaultGridPositions.TopThree]: gridBlock(5, 1, 1, 2, []),
        [TopStoriesV2DefaultGridPositions.TopFour]: gridBlock(6, 1, 1, 2, []),
        [TopStoriesV2DefaultGridPositions.MidInsert]: gridBlock(7, 1, 1, 2, [
          Border.bottom
        ]),
        [TopStoriesV2DefaultGridPositions.BottomOne]: gridBlock(8, 1, 1, 1, []),
        [TopStoriesV2DefaultGridPositions.BottomTwo]: gridBlock(8, 2, 1, 1, []),
        [TopStoriesV2DefaultGridPositions.BottomThree]: gridBlock(
          9,
          1,
          1,
          2,
          []
        ),
        [TopStoriesV2DefaultGridPositions.BottomFour]: gridBlock(
          10,
          1,
          1,
          2,
          []
        ),
        [TopStoriesV2DefaultGridPositions.BottomFive]: gridBlock(
          11,
          1,
          1,
          2,
          []
        ),
        [TopStoriesV2DefaultGridPositions.LowerRight]: gridBlock(
          12,
          1,
          1,
          2,
          []
        )
      }
    };

    const tablet = {
      gridTemplateColumns: "1fr 1fr 2fr",
      gridTemplateRows: repeat(" auto", 11).substring(1),
      gridColumnGap: "20px",
      gridRowGap: "20px",
      gridBlocks: {
        [TopStoriesV2DefaultGridPositions.LeftHighlight]: gridBlock(
          1,
          1,
          1,
          2,
          []
        ),
        [TopStoriesV2DefaultGridPositions.RightHighlight]: gridBlock(
          1,
          3,
          2,
          1,
          []
        ),
        [TopStoriesV2DefaultGridPositions.BannerAd]: gridBlock(3, 3, 5, 1, []),
        [TopStoriesV2DefaultGridPositions.TopOne]: gridBlock(2, 1, 2, 1, []),
        [TopStoriesV2DefaultGridPositions.TopTwo]: gridBlock(2, 2, 2, 1, []),
        [TopStoriesV2DefaultGridPositions.TopThree]: gridBlock(4, 1, 1, 2, []),
        [TopStoriesV2DefaultGridPositions.TopFour]: gridBlock(5, 1, 1, 2, []),
        [TopStoriesV2DefaultGridPositions.MidInsert]: gridBlock(6, 1, 1, 2, [
          Border.bottom
        ]),
        [TopStoriesV2DefaultGridPositions.BottomOne]: gridBlock(7, 1, 2, 1, []),
        [TopStoriesV2DefaultGridPositions.BottomTwo]: gridBlock(7, 2, 2, 1, []),
        [TopStoriesV2DefaultGridPositions.BottomThree]: gridBlock(
          9,
          1,
          1,
          2,
          []
        ),
        [TopStoriesV2DefaultGridPositions.BottomFour]: gridBlock(
          10,
          1,
          1,
          2,
          []
        ),
        [TopStoriesV2DefaultGridPositions.BottomFive]: gridBlock(
          11,
          1,
          1,
          2,
          []
        ),
        [TopStoriesV2DefaultGridPositions.LowerRight]: gridBlock(8, 3, 4, 1, [])
      }
    };

    const desktop = {
      gridTemplateColumns: "1fr 1fr 2fr 300px",
      gridTemplateRows: repeat(" auto", 8).substring(1),
      gridColumnGap: "20px",
      gridRowGap: "20px",
      gridBlocks: {
        [TopStoriesV2DefaultGridPositions.LeftHighlight]: gridBlock(
          1,
          1,
          1,
          2,
          []
        ),
        [TopStoriesV2DefaultGridPositions.RightHighlight]: gridBlock(
          1,
          3,
          2,
          1,
          []
        ),
        [TopStoriesV2DefaultGridPositions.BannerAd]: gridBlock(1, 4, 3, 1, []),
        [TopStoriesV2DefaultGridPositions.TopOne]: gridBlock(2, 1, 3, 1, []),
        [TopStoriesV2DefaultGridPositions.TopTwo]: gridBlock(2, 2, 3, 1, []),
        [TopStoriesV2DefaultGridPositions.TopThree]: gridBlock(3, 3, 1, 1, []),
        [TopStoriesV2DefaultGridPositions.TopFour]: gridBlock(4, 3, 1, 1, []),
        [TopStoriesV2DefaultGridPositions.MidInsert]: gridBlock(5, 1, 1, 3, [
          Border.bottom
        ]),
        [TopStoriesV2DefaultGridPositions.BottomOne]: gridBlock(6, 1, 3, 1, []),
        [TopStoriesV2DefaultGridPositions.BottomTwo]: gridBlock(6, 2, 3, 1, []),
        [TopStoriesV2DefaultGridPositions.BottomThree]: gridBlock(
          6,
          3,
          1,
          1,
          []
        ),
        [TopStoriesV2DefaultGridPositions.BottomFour]: gridBlock(
          7,
          3,
          1,
          1,
          []
        ),
        [TopStoriesV2DefaultGridPositions.BottomFive]: gridBlock(
          8,
          3,
          1,
          1,
          []
        ),
        [TopStoriesV2DefaultGridPositions.LowerRight]: gridBlock(4, 4, 5, 1, [])
      }
    };

    expect(result).toEqual([
      {
        type: ContentBlockType.GridContainer,
        items: {
          [TopStoriesV2DefaultGridPositions.LeftHighlight]: [fakeContentBlock],
          [TopStoriesV2DefaultGridPositions.RightHighlight]: [fakeContentBlock],
          [TopStoriesV2DefaultGridPositions.BannerAd]: [fakeContentBlock],
          [TopStoriesV2DefaultGridPositions.TopOne]: [fakeContentBlock],
          [TopStoriesV2DefaultGridPositions.TopTwo]: [fakeContentBlock],
          [TopStoriesV2DefaultGridPositions.TopThree]: [fakeContentBlock],
          [TopStoriesV2DefaultGridPositions.TopFour]: [fakeContentBlock],
          [TopStoriesV2DefaultGridPositions.BottomOne]: [fakeContentBlock],
          [TopStoriesV2DefaultGridPositions.BottomTwo]: [fakeContentBlock],
          [TopStoriesV2DefaultGridPositions.BottomThree]: [fakeContentBlock],
          [TopStoriesV2DefaultGridPositions.BottomFour]: [fakeContentBlock],
          [TopStoriesV2DefaultGridPositions.BottomFive]: [fakeContentBlock],
          [TopStoriesV2DefaultGridPositions.MidInsert]: [fakeContentBlock],
          [TopStoriesV2DefaultGridPositions.LowerRight]: [fakeContentBlock]
        },
        mobile,
        tablet,
        desktop,
        variation: GridContainerVariation.Border
      }
    ]);
  });
});
