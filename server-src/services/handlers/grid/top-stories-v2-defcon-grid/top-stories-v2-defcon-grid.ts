import { handlerRunnerFunction } from "../../runner";
import { IParams } from "../../../__types__/IParams";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import {
  ITopStoriesV2DefconGridHandlerInput,
  TopStoriesV2DefconGridPositions,
} from "../../__types__/ITopStoriesV2DefconGridHandlerInput";
import { IGridConfig } from "../../../../../common/__types__/IGridContainer";
import { gridBlock } from "../../../adapters/grid/grid-block";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { repeat } from "lodash-es";

export default async function (
  handlerRunner: handlerRunnerFunction,
  { content }: ITopStoriesV2DefconGridHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const desktop: IGridConfig = {
    gridTemplateColumns: "1fr 1fr 2fr 300px",
    gridTemplateRows: repeat(" auto", 8).substring(1),
    gridColumnGap: "20px",
    gridRowGap: "40px",
    gridBlocks: {
      [TopStoriesV2DefconGridPositions.Defcon]: gridBlock(1, 1, 1, 3, []),
      [TopStoriesV2DefconGridPositions.LeftOne]: gridBlock(2, 1, 3, 1, []),
      [TopStoriesV2DefconGridPositions.LeftTwo]: gridBlock(2, 2, 3, 1, []),
      [TopStoriesV2DefconGridPositions.LeftThree]: gridBlock(6, 1, 3, 1, []),
      [TopStoriesV2DefconGridPositions.LeftFour]: gridBlock(6, 2, 3, 1, []),
      [TopStoriesV2DefconGridPositions.RightOne]: gridBlock(2, 3, 1, 1, []),
      [TopStoriesV2DefconGridPositions.RightTwo]: gridBlock(3, 3, 1, 1, []),
      [TopStoriesV2DefconGridPositions.RightThree]: gridBlock(4, 3, 1, 1, []),
      [TopStoriesV2DefconGridPositions.RightFour]: gridBlock(6, 3, 1, 1, []),
      [TopStoriesV2DefconGridPositions.RightFive]: gridBlock(7, 3, 1, 1, []),
      [TopStoriesV2DefconGridPositions.RightSix]: gridBlock(8, 3, 1, 1, []),
      [TopStoriesV2DefconGridPositions.BannerAd]: gridBlock(1, 4, 3, 1, []),
      [TopStoriesV2DefconGridPositions.MidInsert]: gridBlock(5, 1, 1, 3, []),
      [TopStoriesV2DefconGridPositions.LowerRight]: gridBlock(4, 4, 5, 1, []),
    },
  };

  const tablet: IGridConfig = {
    gridTemplateColumns: "1fr 1fr 300px",
    gridTemplateRows: repeat(" auto", 10).substring(1),
    gridColumnGap: "20px",
    gridRowGap: "20px",
    gridBlocks: {
      [TopStoriesV2DefconGridPositions.Defcon]: gridBlock(1, 1, 1, 3, []),
      [TopStoriesV2DefconGridPositions.LeftOne]: gridBlock(2, 1, 1, 1, []),
      [TopStoriesV2DefconGridPositions.LeftTwo]: gridBlock(2, 2, 1, 1, []),
      [TopStoriesV2DefconGridPositions.LeftThree]: gridBlock(7, 1, 1, 1, []),
      [TopStoriesV2DefconGridPositions.LeftFour]: gridBlock(7, 2, 1, 1, []),
      [TopStoriesV2DefconGridPositions.RightOne]: gridBlock(3, 1, 1, 2, []),
      [TopStoriesV2DefconGridPositions.RightTwo]: gridBlock(4, 1, 1, 2, []),
      [TopStoriesV2DefconGridPositions.RightThree]: gridBlock(5, 1, 1, 2, []),
      [TopStoriesV2DefconGridPositions.RightFour]: gridBlock(8, 1, 1, 2, []),
      [TopStoriesV2DefconGridPositions.RightFive]: gridBlock(9, 1, 1, 2, []),
      [TopStoriesV2DefconGridPositions.RightSix]: gridBlock(10, 1, 1, 2, []),
      [TopStoriesV2DefconGridPositions.BannerAd]: gridBlock(2, 3, 4, 1, []),
      [TopStoriesV2DefconGridPositions.MidInsert]: gridBlock(6, 1, 1, 2, []),
      [TopStoriesV2DefconGridPositions.LowerRight]: gridBlock(7, 3, 4, 1, []),
    },
  };

  return [
    {
      type: ContentBlockType.GridContainer,
      items: content,
      mobile: desktop,
      tablet,
      desktop,
    },
  ];
}
