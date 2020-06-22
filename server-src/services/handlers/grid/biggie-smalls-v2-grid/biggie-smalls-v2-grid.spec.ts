import { repeat } from "lodash-es";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import {
  Border,
  IGridConfig,
  IGridContainer
} from "../../../../../common/__types__/IGridContainer";
import { gridBlock } from "../../../adapters/grid/grid-block";
import { IParams } from "../../../__types__/IParams";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import {
  BiggieSmallsV2GridPositions,
  IBiggieSmallsV2GridHandlerInput
} from "../../__types__/IBiggieSmallsV2GridHandlerInput";
import biggieSmallsV2GridHandler from "./biggie-smalls-v2-grid";

describe("Biggie Smalls V2 grid handler", () => {
  const handlerRunnerMock = jest.fn();
  const params = {} as IParams;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should generate the grid with correct values", async () => {
    const fakeContentBlock = {} as IContentBlock;

    const input: IBiggieSmallsV2GridHandlerInput = {
      type: HandlerInputType.BiggieSmallsV2Grid,
      content: {
        [BiggieSmallsV2GridPositions.ModuleTitle]: [fakeContentBlock],
        [BiggieSmallsV2GridPositions.Highlight]: [fakeContentBlock],
        [BiggieSmallsV2GridPositions.RightOne]: [fakeContentBlock],
        [BiggieSmallsV2GridPositions.LeftOne]: [fakeContentBlock],
        [BiggieSmallsV2GridPositions.LeftTwo]: [fakeContentBlock],
        [BiggieSmallsV2GridPositions.RightTwo]: [fakeContentBlock],
        [BiggieSmallsV2GridPositions.RightThree]: [fakeContentBlock],
        [BiggieSmallsV2GridPositions.RightFour]: [fakeContentBlock],
        [BiggieSmallsV2GridPositions.RightFive]: [fakeContentBlock],
        [BiggieSmallsV2GridPositions.BannerAd]: [fakeContentBlock]
      }
    };

    const result = await biggieSmallsV2GridHandler(
      handlerRunnerMock,
      input,
      params
    );

    expect(result[0]).toEqual(
      expect.objectContaining({
        type: ContentBlockType.GridContainer,
        items: {
          [BiggieSmallsV2GridPositions.ModuleTitle]: [fakeContentBlock],
          [BiggieSmallsV2GridPositions.Highlight]: [fakeContentBlock],
          [BiggieSmallsV2GridPositions.RightOne]: [fakeContentBlock],
          [BiggieSmallsV2GridPositions.LeftOne]: [fakeContentBlock],
          [BiggieSmallsV2GridPositions.LeftTwo]: [fakeContentBlock],
          [BiggieSmallsV2GridPositions.RightTwo]: [fakeContentBlock],
          [BiggieSmallsV2GridPositions.RightThree]: [fakeContentBlock],
          [BiggieSmallsV2GridPositions.RightFour]: [fakeContentBlock],
          [BiggieSmallsV2GridPositions.RightFive]: [fakeContentBlock],
          [BiggieSmallsV2GridPositions.BannerAd]: [fakeContentBlock]
        }
      })
    );

    const { mobile, tablet, desktop } = result[0] as IGridContainer;
    const mobileConfig: IGridConfig = {
      gridTemplateColumns: "1fr 1fr",
      gridTemplateRows: repeat(" auto", 9).substring(1),
      gridColumnGap: "20px",
      gridRowGap: "20px",
      gridBlocks: {
        [BiggieSmallsV2GridPositions.ModuleTitle]: gridBlock(1, 1, 1, 2, []),
        [BiggieSmallsV2GridPositions.Highlight]: gridBlock(2, 1, 1, 2, []),
        [BiggieSmallsV2GridPositions.LeftOne]: gridBlock(3, 1, 1, 1, []),
        [BiggieSmallsV2GridPositions.LeftTwo]: gridBlock(3, 2, 1, 1, []),
        [BiggieSmallsV2GridPositions.RightOne]: gridBlock(4, 1, 1, 2, []),
        [BiggieSmallsV2GridPositions.RightTwo]: gridBlock(5, 1, 1, 2, []),
        [BiggieSmallsV2GridPositions.RightThree]: gridBlock(6, 1, 1, 2, []),
        [BiggieSmallsV2GridPositions.RightFour]: gridBlock(7, 1, 1, 2, []),
        [BiggieSmallsV2GridPositions.RightFive]: gridBlock(8, 1, 1, 2, []),
        [BiggieSmallsV2GridPositions.BannerAd]: gridBlock(9, 1, 1, 2, [])
      }
    };

    const tabletConfig: IGridConfig = {
      gridTemplateColumns: "1fr 1fr 300px",
      gridTemplateRows: repeat(" auto", 13).substring(1),
      gridColumnGap: "20px",
      gridRowGap: "20px",
      gridBlocks: {
        [BiggieSmallsV2GridPositions.ModuleTitle]: gridBlock(1, 1, 1, 3, []),
        [BiggieSmallsV2GridPositions.Highlight]: gridBlock(2, 1, 5, 2, []),
        [BiggieSmallsV2GridPositions.RightOne]: gridBlock(2, 3, 4, 1, []),
        [BiggieSmallsV2GridPositions.LeftOne]: gridBlock(7, 1, 4, 1, []),
        [BiggieSmallsV2GridPositions.LeftTwo]: gridBlock(7, 2, 4, 1, []),
        [BiggieSmallsV2GridPositions.RightTwo]: gridBlock(11, 1, 3, 1, []),
        [BiggieSmallsV2GridPositions.RightThree]: gridBlock(11, 2, 1, 1, []),
        [BiggieSmallsV2GridPositions.RightFour]: gridBlock(12, 2, 1, 1, []),
        [BiggieSmallsV2GridPositions.RightFive]: gridBlock(13, 2, 1, 1, []),
        [BiggieSmallsV2GridPositions.BannerAd]: gridBlock(6, 3, 8, 1, [])
      }
    };

    const desktopConfig = {
      gridTemplateColumns: "1fr 1fr 1fr 300px",
      gridTemplateRows: repeat(" auto", 10).substring(1),
      gridColumnGap: "20px",
      gridRowGap: "20px",
      gridBlocks: {
        [BiggieSmallsV2GridPositions.ModuleTitle]: gridBlock(1, 1, 1, 4, []),
        [BiggieSmallsV2GridPositions.Highlight]: gridBlock(2, 1, 5, 2, []),
        [BiggieSmallsV2GridPositions.RightOne]: gridBlock(2, 3, 4, 1, []),
        [BiggieSmallsV2GridPositions.LeftOne]: gridBlock(7, 1, 4, 1, []),
        [BiggieSmallsV2GridPositions.LeftTwo]: gridBlock(7, 2, 4, 1, []),
        [BiggieSmallsV2GridPositions.RightTwo]: gridBlock(6, 3, 2, 1, []),
        [BiggieSmallsV2GridPositions.RightThree]: gridBlock(8, 3, 1, 1, []),
        [BiggieSmallsV2GridPositions.RightFour]: gridBlock(9, 3, 1, 1, []),
        [BiggieSmallsV2GridPositions.RightFive]: gridBlock(10, 3, 1, 1, []),
        [BiggieSmallsV2GridPositions.BannerAd]: gridBlock(2, 4, 9, 1, [])
      }
    };

    expect(mobile).toEqual(mobileConfig);
    expect(tablet).toEqual(tabletConfig);
    expect(desktop).toEqual(desktopConfig);
  });
});
