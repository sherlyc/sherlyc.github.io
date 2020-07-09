import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import {
  GridContainerVariation,
  IGridContainer
} from "../../../../../common/__types__/IGridContainer";
import { gridBlock } from "../../../adapters/grid/grid-block";
import { IParams } from "../../../__types__/IParams";
import { handlerRunnerFunction } from "../../runner";
import {
  IStripsGridHandlerInput,
  StripsGridPositions
} from "../../__types__/IStripsGridHandlerInput";

export default async function (
  handlerRunner: handlerRunnerFunction,
  { content }: IStripsGridHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const grid = {
    [StripsGridPositions.ModuleTitle]: gridBlock(1, 1, 1, 1, []),
    [StripsGridPositions.ModuleContent]: gridBlock(2, 1, 1, 1, [])
  };

  return [
    {
      type: ContentBlockType.GridContainer,
      items: content,
      variation: GridContainerVariation.Border,
      mobile: {
        gridTemplateColumns: "1fr",
        gridTemplateRows: "auto auto",
        gridColumnGap: "0",
        gridRowGap: "10px",
        gridBlocks: grid
      },
      tablet: {
        gridTemplateColumns: "1fr",
        gridTemplateRows: "auto auto",
        gridColumnGap: "0",
        gridRowGap: "20px",
        gridBlocks: grid
      },
      desktop: {
        gridTemplateColumns: "1fr",
        gridTemplateRows: "auto auto",
        gridColumnGap: "0",
        gridRowGap: "20px",
        gridBlocks: grid
      }
    } as IGridContainer
  ];
}
