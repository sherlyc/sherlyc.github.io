import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import {
  Border,
  IGridConfig,
  IGridContainer
} from "../../../../../common/__types__/IGridContainer";
import { IParams } from "../../../__types__/IParams";
import { gridBlock } from "../../../adapters/grid/grid-block";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import {
  BiggieSmallsV2GridPositions,
  IBiggieSmallsV2GridHandlerInput
} from "../../__types__/IBiggieSmallsV2GridHandlerInput";
import biggieSmallsV2GridHandler from "./biggie-smalls-v2-grid";
import { repeat } from "lodash-es";

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
        [BiggieSmallsV2GridPositions.One]: [fakeContentBlock],
        [BiggieSmallsV2GridPositions.Two]: [fakeContentBlock],
        [BiggieSmallsV2GridPositions.Three]: [fakeContentBlock],
        [BiggieSmallsV2GridPositions.Four]: [fakeContentBlock],
        [BiggieSmallsV2GridPositions.Five]: [fakeContentBlock],
        [BiggieSmallsV2GridPositions.Six]: [fakeContentBlock],
        [BiggieSmallsV2GridPositions.Seven]: [fakeContentBlock],
        [BiggieSmallsV2GridPositions.Eight]: [fakeContentBlock],
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
          [BiggieSmallsV2GridPositions.One]: [fakeContentBlock],
          [BiggieSmallsV2GridPositions.Two]: [fakeContentBlock],
          [BiggieSmallsV2GridPositions.Three]: [fakeContentBlock],
          [BiggieSmallsV2GridPositions.Four]: [fakeContentBlock],
          [BiggieSmallsV2GridPositions.Five]: [fakeContentBlock],
          [BiggieSmallsV2GridPositions.Six]: [fakeContentBlock],
          [BiggieSmallsV2GridPositions.Seven]: [fakeContentBlock],
          [BiggieSmallsV2GridPositions.Eight]: [fakeContentBlock],
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
        [BiggieSmallsV2GridPositions.One]: gridBlock(2, 1, 1, 2, []),
        [BiggieSmallsV2GridPositions.Three]: gridBlock(3, 1, 1, 1, [
          Border.bottom
        ]),
        [BiggieSmallsV2GridPositions.Four]: gridBlock(3, 2, 1, 1, [
          Border.bottom
        ]),
        [BiggieSmallsV2GridPositions.Two]: gridBlock(4, 1, 1, 2, [
          Border.bottom
        ]),
        [BiggieSmallsV2GridPositions.Five]: gridBlock(5, 1, 1, 2, [
          Border.bottom
        ]),
        [BiggieSmallsV2GridPositions.Six]: gridBlock(6, 1, 1, 2, [
          Border.bottom
        ]),
        [BiggieSmallsV2GridPositions.Seven]: gridBlock(7, 1, 1, 2, [
          Border.bottom
        ]),
        [BiggieSmallsV2GridPositions.Eight]: gridBlock(8, 1, 1, 2, [
          Border.bottom
        ]),
        [BiggieSmallsV2GridPositions.BannerAd]: gridBlock(9, 1, 1, 2, [
          Border.bottom
        ])
      }
    };

    const tabletConfig: IGridConfig = {
      gridTemplateColumns: "1fr 1fr 300px",
      gridTemplateRows: repeat(" auto", 13).substring(1),
      gridColumnGap: "20px",
      gridRowGap: "20px",
      gridBlocks: {
        [BiggieSmallsV2GridPositions.ModuleTitle]: gridBlock(1, 1, 1, 4, []),
        [BiggieSmallsV2GridPositions.One]: gridBlock(2, 1, 5, 2, []),
        [BiggieSmallsV2GridPositions.Two]: gridBlock(2, 3, 4, 1, [
          Border.bottom
        ]),
        [BiggieSmallsV2GridPositions.Three]: gridBlock(7, 1, 4, 1, [
          Border.bottom
        ]),
        [BiggieSmallsV2GridPositions.Four]: gridBlock(7, 2, 4, 1, [
          Border.bottom
        ]),
        [BiggieSmallsV2GridPositions.Five]: gridBlock(11, 1, 2, 1, []),
        [BiggieSmallsV2GridPositions.Six]: gridBlock(11, 2, 1, 1, [
          Border.bottom
        ]),
        [BiggieSmallsV2GridPositions.Seven]: gridBlock(12, 2, 1, 1, [
          Border.bottom
        ]),
        [BiggieSmallsV2GridPositions.Eight]: gridBlock(13, 2, 1, 1, []),
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
        [BiggieSmallsV2GridPositions.One]: gridBlock(2, 1, 5, 2, []),
        [BiggieSmallsV2GridPositions.Two]: gridBlock(2, 3, 4, 1, [
          Border.bottom
        ]),
        [BiggieSmallsV2GridPositions.Three]: gridBlock(7, 1, 4, 1, [
          Border.bottom
        ]),
        [BiggieSmallsV2GridPositions.Four]: gridBlock(7, 2, 4, 1, [
          Border.bottom
        ]),
        [BiggieSmallsV2GridPositions.Five]: gridBlock(6, 3, 2, 1, [
          Border.bottom
        ]),
        [BiggieSmallsV2GridPositions.Six]: gridBlock(8, 3, 1, 1, [
          Border.bottom
        ]),
        [BiggieSmallsV2GridPositions.Seven]: gridBlock(9, 3, 1, 1, [
          Border.bottom
        ]),
        [BiggieSmallsV2GridPositions.Eight]: gridBlock(10, 3, 1, 1, [
          Border.bottom
        ]),
        [BiggieSmallsV2GridPositions.BannerAd]: gridBlock(2, 4, 8, 1, [])
      }
    };

    expect(mobile).toEqual(mobileConfig);
    expect(tablet).toEqual(tabletConfig);
    expect(desktop).toEqual(desktopConfig);
  });
});
