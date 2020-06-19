import { repeat } from "lodash-es";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { IGridConfig } from "../../../../../common/__types__/IGridContainer";
import { gridBlock } from "../../../adapters/grid/grid-block";
import { IParams } from "../../../__types__/IParams";
import { handlerRunnerFunction } from "../../runner";
import {
  ITopStoriesV2DefaultGridHandlerInput,
  TopStoriesV2DefaultGridPositions
} from "../../__types__/ITopStoriesV2DefaultGridHandlerInput";

export default async function (
  handlerRunner: handlerRunnerFunction,
  { content }: ITopStoriesV2DefaultGridHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const mobile: IGridConfig = {
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: repeat(" auto", 12).substring(1),
    gridColumnGap: "20px",
    gridRowGap: "20px",
    gridBlocks: {
      [TopStoriesV2DefaultGridPositions.LeftHighlight]: gridBlock(
        1,
        1,
        1,
        2,
        []
      ),
      [TopStoriesV2DefaultGridPositions.RightHighlight]: gridBlock(
        2,
        1,
        1,
        2,
        []
      ),
      [TopStoriesV2DefaultGridPositions.BannerAd]: gridBlock(3, 1, 1, 2, []),
      [TopStoriesV2DefaultGridPositions.TopOne]: gridBlock(4, 1, 1, 1, []),
      [TopStoriesV2DefaultGridPositions.TopTwo]: gridBlock(4, 2, 1, 1, []),
      [TopStoriesV2DefaultGridPositions.TopThree]: gridBlock(5, 1, 1, 2, []),
      [TopStoriesV2DefaultGridPositions.TopFour]: gridBlock(6, 1, 1, 2, []),
      [TopStoriesV2DefaultGridPositions.MidInsert]: gridBlock(7, 1, 1, 2, []),
      [TopStoriesV2DefaultGridPositions.BottomOne]: gridBlock(8, 1, 1, 1, []),
      [TopStoriesV2DefaultGridPositions.BottomTwo]: gridBlock(8, 2, 1, 1, []),
      [TopStoriesV2DefaultGridPositions.BottomThree]: gridBlock(9, 1, 1, 2, []),
      [TopStoriesV2DefaultGridPositions.BottomFour]: gridBlock(10, 1, 1, 2, []),
      [TopStoriesV2DefaultGridPositions.BottomFive]: gridBlock(11, 1, 1, 2, []),
      [TopStoriesV2DefaultGridPositions.LowerRight]: gridBlock(12, 1, 1, 2, [])
    }
  };

  const tablet: IGridConfig = {
    gridTemplateColumns: "1fr 1fr 2fr",
    gridTemplateRows: repeat(" auto", 11).substring(1),
    gridColumnGap: "20px",
    gridRowGap: "20px",
    gridBlocks: {
      [TopStoriesV2DefaultGridPositions.LeftHighlight]: gridBlock(
        1,
        1,
        1,
        2,
        []
      ),
      [TopStoriesV2DefaultGridPositions.RightHighlight]: gridBlock(
        1,
        3,
        2,
        1,
        []
      ),
      [TopStoriesV2DefaultGridPositions.BannerAd]: gridBlock(3, 3, 5, 1, []),
      [TopStoriesV2DefaultGridPositions.TopOne]: gridBlock(2, 1, 2, 1, []),
      [TopStoriesV2DefaultGridPositions.TopTwo]: gridBlock(2, 2, 2, 1, []),
      [TopStoriesV2DefaultGridPositions.TopThree]: gridBlock(4, 1, 1, 2, []),
      [TopStoriesV2DefaultGridPositions.TopFour]: gridBlock(5, 1, 1, 2, []),
      [TopStoriesV2DefaultGridPositions.MidInsert]: gridBlock(6, 1, 1, 2, []),
      [TopStoriesV2DefaultGridPositions.BottomOne]: gridBlock(7, 1, 2, 1, []),
      [TopStoriesV2DefaultGridPositions.BottomTwo]: gridBlock(7, 2, 2, 1, []),
      [TopStoriesV2DefaultGridPositions.BottomThree]: gridBlock(9, 1, 1, 2, []),
      [TopStoriesV2DefaultGridPositions.BottomFour]: gridBlock(10, 1, 1, 2, []),
      [TopStoriesV2DefaultGridPositions.BottomFive]: gridBlock(11, 1, 1, 2, []),
      [TopStoriesV2DefaultGridPositions.LowerRight]: gridBlock(8, 3, 5, 1, [])
    }
  };

  const desktop: IGridConfig = {
    gridTemplateColumns: "1fr 1fr 2fr 300px",
    gridTemplateRows: repeat(" auto", 8).substring(1),
    gridColumnGap: "20px",
    gridRowGap: "20px",
    gridBlocks: {
      [TopStoriesV2DefaultGridPositions.LeftHighlight]: gridBlock(
        1,
        1,
        1,
        2,
        []
      ),
      [TopStoriesV2DefaultGridPositions.RightHighlight]: gridBlock(
        1,
        3,
        2,
        1,
        []
      ),
      [TopStoriesV2DefaultGridPositions.BannerAd]: gridBlock(1, 4, 3, 1, []),
      [TopStoriesV2DefaultGridPositions.TopOne]: gridBlock(2, 1, 3, 1, []),
      [TopStoriesV2DefaultGridPositions.TopTwo]: gridBlock(2, 2, 3, 1, []),
      [TopStoriesV2DefaultGridPositions.TopThree]: gridBlock(3, 3, 1, 1, []),
      [TopStoriesV2DefaultGridPositions.TopFour]: gridBlock(4, 3, 1, 1, []),
      [TopStoriesV2DefaultGridPositions.MidInsert]: gridBlock(5, 1, 1, 3, []),
      [TopStoriesV2DefaultGridPositions.BottomOne]: gridBlock(6, 1, 3, 1, []),
      [TopStoriesV2DefaultGridPositions.BottomTwo]: gridBlock(6, 2, 3, 1, []),
      [TopStoriesV2DefaultGridPositions.BottomThree]: gridBlock(6, 3, 1, 1, []),
      [TopStoriesV2DefaultGridPositions.BottomFour]: gridBlock(7, 3, 1, 1, []),
      [TopStoriesV2DefaultGridPositions.BottomFive]: gridBlock(8, 3, 1, 1, []),
      [TopStoriesV2DefaultGridPositions.LowerRight]: gridBlock(4, 4, 5, 1, [])
    }
  };

  return [
    {
      type: ContentBlockType.GridContainer,
      items: content,
      mobile,
      tablet,
      desktop
    }
  ];
}
