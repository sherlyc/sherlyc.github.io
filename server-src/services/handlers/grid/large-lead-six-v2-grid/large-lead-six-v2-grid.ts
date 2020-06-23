import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { IGridConfig } from "../../../../../common/__types__/IGridContainer";
import { gridBlock } from "../../../adapters/grid/grid-block";
import { IParams } from "../../../__types__/IParams";
import { handlerRunnerFunction } from "../../runner";
import {
  ILargeLeadSixV2GridHandlerInput,
  LargeLeadSixV2GridPositions
} from "../../__types__/ILargeLeadSixV2GridHandlerInput";

export default async function (
  handlerRunner: handlerRunnerFunction,
  { content }: ILargeLeadSixV2GridHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const desktop: IGridConfig = {
    gridTemplateColumns: "1fr 1fr 300px",
    gridTemplateRows: "auto auto",
    gridColumnGap: "20px",
    gridRowGap: "20px",
    gridBlocks: {
      [LargeLeadSixV2GridPositions.ModuleTitle]: gridBlock(1, 1, 1, 3, []),
      [LargeLeadSixV2GridPositions.Left]: gridBlock(2, 1, 1, 1, []),
      [LargeLeadSixV2GridPositions.Middle]: gridBlock(2, 2, 1, 1, []),
      [LargeLeadSixV2GridPositions.Right]: gridBlock(2, 3, 1, 1, [])
    }
  };

  const tablet: IGridConfig = {
    gridTemplateColumns: "1fr 1fr 300px",
    gridTemplateRows: "auto auto",
    gridColumnGap: "20px",
    gridRowGap: "20px",
    gridBlocks: {
      [LargeLeadSixV2GridPositions.ModuleTitle]: gridBlock(1, 1, 1, 3, []),
      [LargeLeadSixV2GridPositions.Left]: gridBlock(2, 1, 1, 1, []),
      [LargeLeadSixV2GridPositions.Middle]: gridBlock(2, 2, 1, 1, []),
      [LargeLeadSixV2GridPositions.Right]: gridBlock(2, 3, 1, 1, [])
    }
  };

  const mobile: IGridConfig = {
    gridTemplateColumns: "1fr",
    gridTemplateRows: "auto auto auto auto",
    gridColumnGap: "0px",
    gridRowGap: "20px",
    gridBlocks: {
      [LargeLeadSixV2GridPositions.ModuleTitle]: gridBlock(1, 1, 1, 1, []),
      [LargeLeadSixV2GridPositions.Left]: gridBlock(2, 1, 1, 1, []),
      [LargeLeadSixV2GridPositions.Middle]: gridBlock(3, 1, 1, 1, []),
      [LargeLeadSixV2GridPositions.Right]: gridBlock(4, 1, 1, 1, [])
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
