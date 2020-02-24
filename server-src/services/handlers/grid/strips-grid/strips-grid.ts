import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { IGridContainer } from "../../../../../common/__types__/IGridContainer";
import { IParams } from "../../../__types__/IParams";
import { gridBlock } from "../../../adapters/grid/grid-block";
import {
  IStripsGridHandlerInput,
  StripsGridPositions
} from "../../__types__/IStripsGridHandlerInput";
import { handlerRunnerFunction } from "../../runner";

export default async function(
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
        gridRowGap: "40px",
        gridBlocks: grid
      }
    } as IGridContainer
  ];
}
