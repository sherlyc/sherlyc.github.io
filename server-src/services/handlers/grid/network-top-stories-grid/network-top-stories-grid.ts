import { handlerRunnerFunction } from "../../runner";
import { IParams } from "../../../__types__/IParams";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import {
  INetworkTopStoriesGridHandlerInput,
  NetworkTopStoriesGridPositions
} from "../../__types__/INetworkTopStoriesGridHandlerInput";
import {
  Border,
  IGridConfig
} from "../../../../../common/__types__/IGridContainer";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { gridBlock } from "../../../adapters/grid/grid-block";

export default async function(
  handlerRunner: handlerRunnerFunction,
  { content }: INetworkTopStoriesGridHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {

  const mobile: IGridConfig = {
    gridTemplateColumns: "1fr",
    gridTemplateRows: "auto auto auto",
    gridColumnGap: "20px",
    gridRowGap: "20px",
    gridBlocks: {
      [NetworkTopStoriesGridPositions.ModuleTitle]: gridBlock(1, 1, 1, 1, []),
      [NetworkTopStoriesGridPositions.FirstRow]: gridBlock(2, 1, 1, 1, [Border.bottom]),
      [NetworkTopStoriesGridPositions.SecondRow]: gridBlock(3, 1, 1, 1, []),
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
