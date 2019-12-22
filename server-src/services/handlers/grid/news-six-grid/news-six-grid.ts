import { handlerRunnerFunction } from "../../runner";
import { IParams } from "../../../__types__/IParams";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import {
  INewsSixGridHandlerInput,
  NewsSixGridPositions
} from "../../__types__/INewsSixGridHandlerInput";
import {
  Border,
  IGridBlock,
  IGridBlocks,
  IGridContainer
} from "../../../../../common/__types__/IGridContainer";

const gridBlock = (
  rowStart: number,
  columnStart: number,
  rowSpan: number,
  columnSpan: number,
  border?: Border[]
): IGridBlock => ({
  rowStart,
  rowSpan,
  columnStart,
  columnSpan,
  border
});

export default async function(
  handlerRunner: handlerRunnerFunction,
  { content }: INewsSixGridHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const desktop: IGridBlocks = {
    [NewsSixGridPositions.ModuleTitle]: gridBlock(1, 1, 1, 5),
    [NewsSixGridPositions.BigTopLeft]: gridBlock(2, 1, 1, 4, [Border.bottom]),
    [NewsSixGridPositions.SmallTopRight]: gridBlock(2, 5, 2, 1, [Border.left]),
    [NewsSixGridPositions.SmallBottomFirst]: gridBlock(3, 1, 1, 1, [
      Border.right
    ]),
    [NewsSixGridPositions.SmallBottomSecond]: gridBlock(3, 2, 1, 1, [
      Border.right
    ]),
    [NewsSixGridPositions.SmallBottomThird]: gridBlock(3, 3, 1, 1, [
      Border.right
    ]),
    [NewsSixGridPositions.SmallBottomFourth]: gridBlock(3, 4, 1, 1)
  };

  const mobile: IGridBlocks = {
    [NewsSixGridPositions.ModuleTitle]: gridBlock(1, 1, 1, 1),
    [NewsSixGridPositions.BigTopLeft]: gridBlock(2, 1, 1, 1, [Border.bottom]),
    [NewsSixGridPositions.SmallTopRight]: gridBlock(3, 1, 1, 1, [
      Border.bottom
    ]),
    [NewsSixGridPositions.SmallBottomFirst]: gridBlock(4, 1, 1, 1, [
      Border.bottom
    ]),
    [NewsSixGridPositions.SmallBottomSecond]: gridBlock(5, 1, 1, 1, [
      Border.bottom
    ]),
    [NewsSixGridPositions.SmallBottomThird]: gridBlock(6, 1, 1, 1, [
      Border.bottom
    ]),
    [NewsSixGridPositions.SmallBottomFourth]: gridBlock(7, 1, 1, 1)
  };

  return [
    {
      type: ContentBlockType.GridContainer,
      items: content,
      mobile: {
        gridTemplateColumns: "1fr",
        gridTemplateRows: "auto auto auto auto auto auto auto",
        gridGap: "20px",
        gridBlocks: mobile
      },
      tablet: {
        gridTemplateColumns: "1fr 1fr 1fr 1fr 300px",
        gridTemplateRows: "auto auto auto",
        gridGap: "20px",
        gridBlocks: desktop
      },
      desktop: {
        gridTemplateColumns: "1fr 1fr 1fr 1fr 300px",
        gridTemplateRows: "auto auto auto",
        gridGap: "40px",
        gridBlocks: desktop
      }
    } as IGridContainer
  ];
}
