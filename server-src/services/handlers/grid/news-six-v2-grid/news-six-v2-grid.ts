import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import {
  Border,
  GridContainerVariation,
  IGridBlocks,
  IGridContainer
} from "../../../../../common/__types__/IGridContainer";
import { gridBlock } from "../../../adapters/grid/grid-block";
import { IParams } from "../../../__types__/IParams";
import { handlerRunnerFunction } from "../../runner";
import {
  INewsSixGridV2HandlerInput,
  NewsSixV2GridPositions
} from "../../__types__/INewsSixGridV2HandlerInput";

export default async function (
  handlerRunner: handlerRunnerFunction,
  { content }: INewsSixGridV2HandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const desktop: IGridBlocks = {
    [NewsSixV2GridPositions.ModuleTitle]: gridBlock(1, 1, 1, 3, []),
    [NewsSixV2GridPositions.One]: gridBlock(2, 1, 3, 1, [Border.right]),
    [NewsSixV2GridPositions.Two]: gridBlock(2, 2, 1, 1, []),
    [NewsSixV2GridPositions.Three]: gridBlock(3, 2, 1, 1, []),
    [NewsSixV2GridPositions.Four]: gridBlock(2, 3, 3, 1, []),
    [NewsSixV2GridPositions.Five]: gridBlock(5, 1, 1, 1, []),
    [NewsSixV2GridPositions.Six]: gridBlock(5, 2, 1, 2, [])
  };

  const tablet: IGridBlocks = {
    [NewsSixV2GridPositions.ModuleTitle]: gridBlock(1, 1, 1, 2, []),
    [NewsSixV2GridPositions.One]: gridBlock(2, 1, 2, 1, [Border.right]),
    [NewsSixV2GridPositions.Two]: gridBlock(2, 2, 1, 1, []),
    [NewsSixV2GridPositions.Three]: gridBlock(3, 2, 1, 1, []),
    [NewsSixV2GridPositions.Four]: gridBlock(4, 2, 2, 1, []),
    [NewsSixV2GridPositions.Five]: gridBlock(4, 1, 1, 1, []),
    [NewsSixV2GridPositions.Six]: gridBlock(5, 1, 1, 1, [])
  };

  const mobile: IGridBlocks = {
    [NewsSixV2GridPositions.ModuleTitle]: gridBlock(1, 1, 1, 2, []),
    [NewsSixV2GridPositions.One]: gridBlock(2, 1, 1, 2, []),
    [NewsSixV2GridPositions.Two]: gridBlock(3, 1, 1, 2, []),
    [NewsSixV2GridPositions.Three]: gridBlock(4, 1, 1, 2, []),
    [NewsSixV2GridPositions.Four]: gridBlock(5, 1, 1, 2, []),
    [NewsSixV2GridPositions.Five]: gridBlock(6, 1, 1, 1, []),
    [NewsSixV2GridPositions.Six]: gridBlock(6, 2, 1, 1, [])
  };

  return [
    {
      type: ContentBlockType.GridContainer,
      items: content,
      mobile: {
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "auto auto auto auto auto auto",
        gridColumnGap: "20px",
        gridRowGap: "20px",
        gridBlocks: mobile
      },
      tablet: {
        gridTemplateColumns: "2fr 1fr",
        gridTemplateRows: "auto auto auto auto auto",
        gridColumnGap: "30px",
        gridRowGap: "20px",
        gridBlocks: tablet
      },
      desktop: {
        gridTemplateColumns: "5fr 2fr 300px",
        gridTemplateRows: "auto auto auto auto auto",
        gridColumnGap: "40px",
        gridRowGap: "20px",
        gridBlocks: desktop
      },
      variation: GridContainerVariation.Border
    } as IGridContainer
  ];
}
