import { repeat } from "lodash-es";
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
    gridTemplateRows: repeat(" auto", 5).substring(1),
    gridColumnGap: "20px",
    gridRowGap: "20px",
    gridBlocks: {
      [LargeLeadSixV2GridPositions.ModuleTitle]: gridBlock(1, 1, 1, 3, []),
      [LargeLeadSixV2GridPositions.Left]: gridBlock(2, 1, 4, 1, []),
      [LargeLeadSixV2GridPositions.MiddleOne]: gridBlock(2, 2, 1, 1, []),
      [LargeLeadSixV2GridPositions.MiddleTwo]: gridBlock(3, 2, 1, 1, []),
      [LargeLeadSixV2GridPositions.MiddleThree]: gridBlock(4, 2, 1, 1, []),
      [LargeLeadSixV2GridPositions.MiddleFour]: gridBlock(5, 2, 1, 1, []),
      [LargeLeadSixV2GridPositions.Right]: gridBlock(2, 3, 4, 1, [])
    }
  };

  const tablet: IGridConfig = {
    gridTemplateColumns: "1fr 1fr 300px",
    gridTemplateRows: repeat(" auto", 5).substring(1),
    gridColumnGap: "20px",
    gridRowGap: "20px",
    gridBlocks: {
      [LargeLeadSixV2GridPositions.ModuleTitle]: gridBlock(1, 1, 1, 3, []),
      [LargeLeadSixV2GridPositions.Left]: gridBlock(2, 1, 4, 1, []),
      [LargeLeadSixV2GridPositions.MiddleOne]: gridBlock(2, 2, 1, 1, []),
      [LargeLeadSixV2GridPositions.MiddleTwo]: gridBlock(3, 2, 1, 1, []),
      [LargeLeadSixV2GridPositions.MiddleThree]: gridBlock(4, 2, 1, 1, []),
      [LargeLeadSixV2GridPositions.MiddleFour]: gridBlock(5, 2, 1, 1, []),
      [LargeLeadSixV2GridPositions.Right]: gridBlock(2, 3, 4, 1, [])
    }
  };

  const mobile: IGridConfig = {
    gridTemplateColumns: "1fr",
    gridTemplateRows: repeat(" auto", 7).substring(1),
    gridColumnGap: "0px",
    gridRowGap: "20px",
    gridBlocks: {
      [LargeLeadSixV2GridPositions.ModuleTitle]: gridBlock(1, 1, 1, 1, []),
      [LargeLeadSixV2GridPositions.Left]: gridBlock(2, 1, 1, 1, []),
      [LargeLeadSixV2GridPositions.MiddleOne]: gridBlock(3, 1, 1, 1, []),
      [LargeLeadSixV2GridPositions.MiddleTwo]: gridBlock(4, 1, 1, 1, []),
      [LargeLeadSixV2GridPositions.MiddleThree]: gridBlock(5, 1, 1, 1, []),
      [LargeLeadSixV2GridPositions.MiddleFour]: gridBlock(6, 1, 1, 1, []),
      [LargeLeadSixV2GridPositions.Right]: gridBlock(7, 1, 1, 1, [])
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
