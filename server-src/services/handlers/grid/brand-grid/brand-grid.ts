import { handlerRunnerFunction } from "../../runner";
import { IParams } from "../../../__types__/IParams";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import {
  IBrandGridHandlerInput,
  BrandGridPositions
} from "../../__types__/IBrandGridHandlerInput";
import { Border } from "../../../../../common/__types__/IGridContainer";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { gridBlock } from "../../../adapters/grid/grid-block";

export default async function(
  handlerRunner: handlerRunnerFunction,
  { content }: IBrandGridHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const grid = {
    [BrandGridPositions.ModuleTitle]: gridBlock(1, 1, 1, 1, []),
    [BrandGridPositions.FirstRow]: gridBlock(
      2,
      1,
      1,
      1,
      content.SecondRow.length > 0 ? [Border.bottom] : []
    ),
    [BrandGridPositions.SecondRow]: gridBlock(3, 1, 1, 1, [])
  };

  return [
    {
      type: ContentBlockType.GridContainer,
      items: content,
      mobile: {
        gridTemplateColumns: "1fr",
        gridTemplateRows: "auto auto auto",
        gridColumnGap: "0px",
        gridRowGap: "10px",
        gridBlocks: grid
      },
      tablet: {
        gridTemplateColumns: "1fr",
        gridTemplateRows: "auto auto auto",
        gridColumnGap: "0px",
        gridRowGap: "20px",
        gridBlocks: grid
      },
      desktop: {
        gridTemplateColumns: "1fr",
        gridTemplateRows: "auto auto auto",
        gridColumnGap: "0px",
        gridRowGap: "40px",
        gridBlocks: grid
      }
    }
  ];
}
