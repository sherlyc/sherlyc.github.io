import { handlerRunnerFunction } from "../../runner";
import { IParams } from "../../../__types__/IParams";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import {
  ILargeLeadSixGridHandlerInput,
  LargeLeadSixGridPositions
} from "../../__types__/ILargeLeadSixGridHandlerInput";
import {
  Border,
  IGridConfig
} from "../../../../../common/__types__/IGridContainer";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { gridBlock } from "../../../adapters/grid/grid-block";

export default async function(
  handlerRunner: handlerRunnerFunction,
  { content }: ILargeLeadSixGridHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const desktop: IGridConfig = {
    gridTemplateColumns: "1fr 1fr 300px",
    gridTemplateRows: "auto auto",
    gridColumnGap: "40px",
    gridRowGap: "40px",
    gridBlocks: {
      [LargeLeadSixGridPositions.ModuleTitle]: gridBlock(1, 1, 1, 3, []),
      [LargeLeadSixGridPositions.Left]: gridBlock(2, 1, 1, 1, [Border.right]),
      [LargeLeadSixGridPositions.Middle]: gridBlock(2, 2, 1, 1, [Border.right]),
      [LargeLeadSixGridPositions.Right]: gridBlock(2, 3, 1, 1, [])
    }
  };

  const tablet: IGridConfig = {
    gridTemplateColumns: "1fr 1fr 300px",
    gridTemplateRows: "auto auto",
    gridColumnGap: "20px",
    gridRowGap: "20px",
    gridBlocks: {
      [LargeLeadSixGridPositions.ModuleTitle]: gridBlock(1, 1, 1, 3, []),
      [LargeLeadSixGridPositions.Left]: gridBlock(2, 1, 1, 1, [Border.right]),
      [LargeLeadSixGridPositions.Middle]: gridBlock(2, 2, 1, 1, [Border.right]),
      [LargeLeadSixGridPositions.Right]: gridBlock(2, 3, 1, 1, [])
    }
  };

  const mobile: IGridConfig = {
    gridTemplateColumns: "1fr",
    gridTemplateRows: "auto auto auto auto",
    gridColumnGap: "0px",
    gridRowGap: "20px",
    gridBlocks: {
      [LargeLeadSixGridPositions.ModuleTitle]: gridBlock(1, 1, 1, 1, []),
      [LargeLeadSixGridPositions.Left]: gridBlock(2, 1, 1, 1, [Border.bottom]),
      [LargeLeadSixGridPositions.Middle]: gridBlock(3, 1, 1, 1, [
        Border.bottom
      ]),
      [LargeLeadSixGridPositions.Right]: gridBlock(4, 1, 1, 1, [])
    }
  };

  return [
    {
      type: ContentBlockType.GridContainer,
      items: content,
      desktop,
      tablet,
      mobile
    }
  ];
}
