import { handlerRunnerFunction } from "../../runner";
import { IParams } from "../../../__types__/IParams";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import {
  IRelevantStoriesGridHandlerInput,
  RelevantStoriesGridPositions
} from "../../__types__/IRelevantStoriesGridHandlerInput";
import { IGridConfig } from "../../../../../common/__types__/IGridContainer";
import { gridBlock } from "../../../adapters/grid/grid-block";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";

export default async function(
  handlerRunner: handlerRunnerFunction,
  { content }: IRelevantStoriesGridHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const mobile: IGridConfig = {
    gridTemplateColumns: "1fr",
    gridTemplateRows: "auto",
    gridColumnGap: "0px",
    gridRowGap: "20px",
    gridBlocks: {
      [RelevantStoriesGridPositions.Left]: gridBlock(1, 1, 1, 1, []),
      [RelevantStoriesGridPositions.Right]: gridBlock(2, 1, 1, 1, [])
    }
  };

  const desktop: IGridConfig = {
    gridTemplateColumns: "1fr 300px",
    gridTemplateRows: "auto",
    gridColumnGap: "20px",
    gridRowGap: "20px",
    gridBlocks: {
      [RelevantStoriesGridPositions.Left]: gridBlock(1, 1, 1, 1, []),
      [RelevantStoriesGridPositions.Right]: gridBlock(1, 1, 1, 1, [])
    }
  };

  return [
    {
      type: ContentBlockType.GridContainer,
      items: content,
      mobile,
      desktop
    }
  ];
}
