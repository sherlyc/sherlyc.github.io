import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import {
  Border,
  IGridBlocks,
  IGridContainer
} from "../../../../../common/__types__/IGridContainer";
import { IParams } from "../../../__types__/IParams";
import { gridBlock } from "../../../adapters/grid/grid-block";
import {
  BiggieSmallsV2GridPositions,
  IBiggieSmallsV2GridHandlerInput
} from "../../__types__/IBiggieSmallsV2GridHandlerInput";
import { handlerRunnerFunction } from "../../runner";
import { repeat } from "lodash-es";

export default async function(
  handlerRunner: handlerRunnerFunction,
  { content }: IBiggieSmallsV2GridHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const mobile: IGridBlocks = {
    [BiggieSmallsV2GridPositions.ModuleTitle]: gridBlock(1, 1, 1, 2, []),
    [BiggieSmallsV2GridPositions.One]: gridBlock(2, 1, 1, 2, []),
    [BiggieSmallsV2GridPositions.Three]: gridBlock(3, 1, 1, 1, [Border.bottom]),
    [BiggieSmallsV2GridPositions.Four]: gridBlock(3, 2, 1, 1, [Border.bottom]),
    [BiggieSmallsV2GridPositions.Two]: gridBlock(4, 1, 1, 2, [Border.bottom]),
    [BiggieSmallsV2GridPositions.Five]: gridBlock(5, 1, 1, 2, [Border.bottom]),
    [BiggieSmallsV2GridPositions.Six]: gridBlock(6, 1, 1, 2, [Border.bottom]),
    [BiggieSmallsV2GridPositions.Seven]: gridBlock(7, 1, 1, 2, [Border.bottom]),
    [BiggieSmallsV2GridPositions.Eight]: gridBlock(8, 1, 1, 2, [Border.bottom]),
    [BiggieSmallsV2GridPositions.BannerAd]: gridBlock(9, 1, 1, 2, [
      Border.bottom
    ])
  };
  const tablet: IGridBlocks = {
    [BiggieSmallsV2GridPositions.ModuleTitle]: gridBlock(1, 1, 1, 4, []),
    [BiggieSmallsV2GridPositions.One]: gridBlock(2, 1, 5, 2, []),
    [BiggieSmallsV2GridPositions.Two]: gridBlock(2, 3, 4, 1, [Border.bottom]),
    [BiggieSmallsV2GridPositions.Three]: gridBlock(7, 1, 4, 1, [Border.bottom]),
    [BiggieSmallsV2GridPositions.Four]: gridBlock(7, 2, 4, 1, [Border.bottom]),
    [BiggieSmallsV2GridPositions.Five]: gridBlock(11, 1, 2, 1, []),
    [BiggieSmallsV2GridPositions.Six]: gridBlock(11, 2, 1, 1, [Border.bottom]),
    [BiggieSmallsV2GridPositions.Seven]: gridBlock(12, 2, 1, 1, [
      Border.bottom
    ]),
    [BiggieSmallsV2GridPositions.Eight]: gridBlock(13, 2, 1, 1, []),
    [BiggieSmallsV2GridPositions.BannerAd]: gridBlock(6, 3, 8, 1, [])
  };

  const desktop: IGridBlocks = {
    [BiggieSmallsV2GridPositions.ModuleTitle]: gridBlock(1, 1, 1, 4, []),
    [BiggieSmallsV2GridPositions.One]: gridBlock(2, 1, 5, 2, []),
    [BiggieSmallsV2GridPositions.Two]: gridBlock(2, 3, 4, 1, [Border.bottom]),
    [BiggieSmallsV2GridPositions.Three]: gridBlock(7, 1, 4, 1, [Border.bottom]),
    [BiggieSmallsV2GridPositions.Four]: gridBlock(7, 2, 4, 1, [Border.bottom]),
    [BiggieSmallsV2GridPositions.Five]: gridBlock(6, 3, 2, 1, [Border.bottom]),
    [BiggieSmallsV2GridPositions.Six]: gridBlock(8, 3, 1, 1, [Border.bottom]),
    [BiggieSmallsV2GridPositions.Seven]: gridBlock(9, 3, 1, 1, [Border.bottom]),
    [BiggieSmallsV2GridPositions.Eight]: gridBlock(10, 3, 1, 1, [
      Border.bottom
    ]),
    [BiggieSmallsV2GridPositions.BannerAd]: gridBlock(2, 4, 8, 1, [])
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
