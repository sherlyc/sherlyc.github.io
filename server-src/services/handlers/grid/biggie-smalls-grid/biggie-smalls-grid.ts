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
  BiggieSmallsGridPositions,
  IBiggieSmallsGridHandlerInput
} from "../../__types__/IBiggieSmallsGridHandlerInput";
import { handlerRunnerFunction } from "../../runner";

export default async function(
  handlerRunner: handlerRunnerFunction,
  { content }: IBiggieSmallsGridHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const desktop: IGridBlocks = {
    [BiggieSmallsGridPositions.ModuleTitle]: gridBlock(1, 1, 1, 4, []),
    [BiggieSmallsGridPositions.Highlight]: gridBlock(2, 1, 1, 3, [
      Border.bottom
    ]),
    [BiggieSmallsGridPositions.Right]: gridBlock(2, 4, 3, 1, []),
    [BiggieSmallsGridPositions.FirstRow1]: gridBlock(3, 1, 1, 1, []),
    [BiggieSmallsGridPositions.FirstRow2]: gridBlock(3, 2, 1, 1, []),
    [BiggieSmallsGridPositions.FirstRow3]: gridBlock(3, 3, 1, 1, [])
  };

  const tablet: IGridBlocks = {
    [BiggieSmallsGridPositions.ModuleTitle]: gridBlock(1, 1, 1, 3, []),
    [BiggieSmallsGridPositions.Highlight]: gridBlock(2, 1, 1, 3, [
      Border.bottom
    ]),
    [BiggieSmallsGridPositions.Right]: gridBlock(3, 3, 2, 1, []),
    [BiggieSmallsGridPositions.FirstRow1]: gridBlock(3, 1, 1, 1, []),
    [BiggieSmallsGridPositions.FirstRow2]: gridBlock(3, 2, 1, 1, []),
    [BiggieSmallsGridPositions.FirstRow3]: gridBlock(4, 1, 1, 1, [])
  };

  const mobile: IGridBlocks = {
    [BiggieSmallsGridPositions.ModuleTitle]: gridBlock(1, 1, 1, 1, []),
    [BiggieSmallsGridPositions.Highlight]: gridBlock(2, 1, 1, 1, []),
    [BiggieSmallsGridPositions.Right]: gridBlock(6, 1, 1, 1, []),
    [BiggieSmallsGridPositions.FirstRow1]: gridBlock(3, 1, 1, 1, []),
    [BiggieSmallsGridPositions.FirstRow2]: gridBlock(5, 1, 1, 1, [Border.top]),
    [BiggieSmallsGridPositions.FirstRow3]: gridBlock(4, 1, 1, 1, [Border.top])
  };

  return [
    {
      type: ContentBlockType.GridContainer,
      items: content,
      mobile: {
        gridTemplateColumns: "1fr",
        gridTemplateRows: "auto auto auto auto auto auto",
        gridColumnGap: "20px",
        gridRowGap: "20px",
        gridBlocks: mobile
      },
      tablet: {
        gridTemplateColumns: "1fr 1fr 1fr",
        gridTemplateRows: "auto auto auto auto",
        gridColumnGap: "20px",
        gridRowGap: "20px",
        gridBlocks: tablet
      },
      desktop: {
        gridTemplateColumns: "1fr 1fr 1fr 300px",
        gridTemplateRows: "auto auto auto",
        gridColumnGap: "20px",
        gridRowGap: "20px",
        gridBlocks: desktop
      }
    } as IGridContainer
  ];
}
