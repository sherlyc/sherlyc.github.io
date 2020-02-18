import { handlerRunnerFunction } from "../../runner";
import { IParams } from "../../../__types__/IParams";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import {
  IBrandGridHandlerInput,
  BrandGridPositions
} from "../../__types__/IBrandGridHandlerInput";
import {
  Border,
  IGridConfig
} from "../../../../../common/__types__/IGridContainer";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { gridBlock } from "../../../adapters/grid/grid-block";

export default async function(
  handlerRunner: handlerRunnerFunction,
  { content }: IBrandGridHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const mobile: IGridConfig = {
    gridTemplateColumns: "1fr",
    gridTemplateRows: "auto auto auto",
    gridColumnGap: "20px",
    gridRowGap: "20px",
    gridBlocks: {
      [BrandGridPositions.ModuleTitle]: gridBlock(1, 1, 1, 1, []),
      [BrandGridPositions.FirstRow]: gridBlock(2, 1, 1, 1, [Border.bottom]),
      [BrandGridPositions.SecondRow]: gridBlock(3, 1, 1, 1, [])
    }
  };

  return [
    {
      type: ContentBlockType.GridContainer,
      items: content,
      mobile
    }
  ];
}
