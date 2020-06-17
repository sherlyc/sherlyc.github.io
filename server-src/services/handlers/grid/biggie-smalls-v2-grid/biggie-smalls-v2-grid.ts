import { repeat } from "lodash-es";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import {
  Border,
  IGridBlocks,
  IGridContainer
} from "../../../../../common/__types__/IGridContainer";
import { gridBlock } from "../../../adapters/grid/grid-block";
import { IParams } from "../../../__types__/IParams";
import { handlerRunnerFunction } from "../../runner";
import {
  BiggieSmallsV2GridPositions,
  IBiggieSmallsV2GridHandlerInput
} from "../../__types__/IBiggieSmallsV2GridHandlerInput";

export default async function(
  handlerRunner: handlerRunnerFunction,
  { content }: IBiggieSmallsV2GridHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const mobile: IGridBlocks = {
    [BiggieSmallsV2GridPositions.ModuleTitle]: gridBlock(1, 1, 1, 2, []),
    [BiggieSmallsV2GridPositions.Highlight]: gridBlock(2, 1, 1, 2, []),
    [BiggieSmallsV2GridPositions.LeftOne]: gridBlock(3, 1, 1, 1, [
      Border.bottom
    ]),
    [BiggieSmallsV2GridPositions.LeftTwo]: gridBlock(3, 2, 1, 1, [
      Border.bottom
    ]),
    [BiggieSmallsV2GridPositions.RightOne]: gridBlock(4, 1, 1, 2, [
      Border.bottom
    ]),
    [BiggieSmallsV2GridPositions.RightTwo]: gridBlock(5, 1, 1, 2, [
      Border.bottom
    ]),
    [BiggieSmallsV2GridPositions.RightThree]: gridBlock(6, 1, 1, 2, [
      Border.bottom
    ]),
    [BiggieSmallsV2GridPositions.RightFour]: gridBlock(7, 1, 1, 2, [
      Border.bottom
    ]),
    [BiggieSmallsV2GridPositions.RightFive]: gridBlock(8, 1, 1, 2, [
      Border.bottom
    ]),
    [BiggieSmallsV2GridPositions.BannerAd]: gridBlock(9, 1, 1, 2, [
      Border.bottom
    ])
  };
  const tablet: IGridBlocks = {
    [BiggieSmallsV2GridPositions.ModuleTitle]: gridBlock(1, 1, 1, 3, []),
    [BiggieSmallsV2GridPositions.Highlight]: gridBlock(2, 1, 5, 2, []),
    [BiggieSmallsV2GridPositions.RightOne]: gridBlock(2, 3, 4, 1, [
      Border.bottom
    ]),
    [BiggieSmallsV2GridPositions.LeftOne]: gridBlock(7, 1, 4, 1, [
      Border.bottom
    ]),
    [BiggieSmallsV2GridPositions.LeftTwo]: gridBlock(7, 2, 4, 1, [
      Border.bottom
    ]),
    [BiggieSmallsV2GridPositions.RightTwo]: gridBlock(11, 1, 3, 1, []),
    [BiggieSmallsV2GridPositions.RightThree]: gridBlock(11, 2, 1, 1, [
      Border.bottom
    ]),
    [BiggieSmallsV2GridPositions.RightFour]: gridBlock(12, 2, 1, 1, [
      Border.bottom
    ]),
    [BiggieSmallsV2GridPositions.RightFive]: gridBlock(13, 2, 1, 1, []),
    [BiggieSmallsV2GridPositions.BannerAd]: gridBlock(6, 3, 8, 1, [])
  };

  const desktop: IGridBlocks = {
    [BiggieSmallsV2GridPositions.ModuleTitle]: gridBlock(1, 1, 1, 4, []),
    [BiggieSmallsV2GridPositions.Highlight]: gridBlock(2, 1, 5, 2, []),
    [BiggieSmallsV2GridPositions.RightOne]: gridBlock(2, 3, 4, 1, [
      Border.bottom
    ]),
    [BiggieSmallsV2GridPositions.LeftOne]: gridBlock(7, 1, 4, 1, [
      Border.bottom
    ]),
    [BiggieSmallsV2GridPositions.LeftTwo]: gridBlock(7, 2, 4, 1, [
      Border.bottom
    ]),
    [BiggieSmallsV2GridPositions.RightTwo]: gridBlock(6, 3, 2, 1, [
      Border.bottom
    ]),
    [BiggieSmallsV2GridPositions.RightThree]: gridBlock(8, 3, 1, 1, [
      Border.bottom
    ]),
    [BiggieSmallsV2GridPositions.RightFour]: gridBlock(9, 3, 1, 1, [
      Border.bottom
    ]),
    [BiggieSmallsV2GridPositions.RightFive]: gridBlock(10, 3, 1, 1, [
      Border.bottom
    ]),
    [BiggieSmallsV2GridPositions.BannerAd]: gridBlock(2, 4, 9, 1, [])
  };

  return [
    {
      type: ContentBlockType.GridContainer,
      items: content,
      mobile: {
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: repeat(" auto", 9).substring(1),
        gridColumnGap: "20px",
        gridRowGap: "20px",
        gridBlocks: mobile
      },
      tablet: {
        gridTemplateColumns: "1fr 1fr 300px",
        gridTemplateRows: repeat(" auto", 13).substring(1),
        gridColumnGap: "20px",
        gridRowGap: "20px",
        gridBlocks: tablet
      },
      desktop: {
        gridTemplateColumns: "1fr 1fr 1fr 300px",
        gridTemplateRows: repeat(" auto", 10).substring(1),
        gridColumnGap: "20px",
        gridRowGap: "20px",
        gridBlocks: desktop
      }
    } as IGridContainer
  ];
}
