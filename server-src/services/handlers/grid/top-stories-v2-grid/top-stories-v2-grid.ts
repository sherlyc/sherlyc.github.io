import { handlerRunnerFunction } from "../../runner";
import { IParams } from "../../../__types__/IParams";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import {
  ITopStoriesV2GridHandlerInput,
  TopStoriesV2GridPositions
} from "../../__types__/ITopStoriesV2GridHandlerInput";
import { IGridBlocks } from "../../../../../common/__types__/IGridContainer";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { gridBlock } from "../../../adapters/grid/grid-block";

export default async function(
  handlerRunner: handlerRunnerFunction,
  { content }: ITopStoriesV2GridHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const mobile: IGridBlocks = {
    [TopStoriesV2GridPositions.LeftHighlight]: gridBlock(1, 1, 1, 2, []),
    [TopStoriesV2GridPositions.RightHighlight]: gridBlock(2, 1, 1, 2, []),
    [TopStoriesV2GridPositions.BannerAd]: gridBlock(3, 1, 1, 2, []),
    [TopStoriesV2GridPositions.LeftOne]: gridBlock(4, 1, 1, 1, []),
    [TopStoriesV2GridPositions.LeftTwo]: gridBlock(4, 2, 1, 1, []),
    [TopStoriesV2GridPositions.LeftThree]: gridBlock(5, 1, 1, 1, []),
    [TopStoriesV2GridPositions.LeftFour]: gridBlock(5, 2, 1, 1, []),
    [TopStoriesV2GridPositions.RightOne]: gridBlock(6, 1, 1, 2, []),
    [TopStoriesV2GridPositions.RightTwo]: gridBlock(7, 1, 1, 2, []),
    [TopStoriesV2GridPositions.RightThree]: gridBlock(8, 1, 1, 2, []),
    [TopStoriesV2GridPositions.RightFour]: gridBlock(9, 1, 1, 2, [])
  };

  return [
    {
      type: ContentBlockType.GridContainer,
      items: content,
      mobile: {
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "auto auto auto auto auto auto auto auto auto",
        gridColumnGap: "0px",
        gridRowGap: "20px",
        gridBlocks: mobile
      }
    }
  ];
}
