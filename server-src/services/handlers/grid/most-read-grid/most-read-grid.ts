import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import {
  Border,
  IGridBlocks,
} from "../../../../../common/__types__/IGridContainer";
import { gridBlock } from "../../../adapters/grid/grid-block";
import { IParams } from "../../../__types__/IParams";
import { handlerRunnerFunction } from "../../runner";
import {
  IMostReadGridHandlerInput,
  MostReadGridPositions,
} from "../../__types__/IMostReadGridHandlerInput";

export default async function (
  handlerRunner: handlerRunnerFunction,
  { content }: IMostReadGridHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const mobile: IGridBlocks = {
    [MostReadGridPositions.Left]: gridBlock(1, 1, 1, 1, []),
    [MostReadGridPositions.Right]: gridBlock(2, 1, 1, 1, [Border.bottom]),
  };

  const tablet: IGridBlocks = {
    [MostReadGridPositions.Left]: gridBlock(1, 1, 1, 1, []),
    [MostReadGridPositions.Right]: gridBlock(1, 2, 1, 1, []),
  };

  const desktop: IGridBlocks = {
    [MostReadGridPositions.Left]: gridBlock(1, 1, 1, 2, []),
    [MostReadGridPositions.Right]: gridBlock(1, 3, 1, 1, []),
  };

  return [
    {
      type: ContentBlockType.GridContainer,
      items: content,
      mobile: {
        gridTemplateColumns: "1fr",
        gridTemplateRows: "auto auto",
        gridColumnGap: "20px",
        gridRowGap: "20px",
        gridBlocks: mobile,
      },
      tablet: {
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "auto",
        gridColumnGap: "20px",
        gridRowGap: "20px",
        gridBlocks: tablet,
      },
      desktop: {
        gridTemplateColumns: "1fr 1fr 1fr",
        gridTemplateRows: "auto",
        gridColumnGap: "20px",
        gridRowGap: "20px",
        gridBlocks: desktop,
      },
    },
  ];
}
