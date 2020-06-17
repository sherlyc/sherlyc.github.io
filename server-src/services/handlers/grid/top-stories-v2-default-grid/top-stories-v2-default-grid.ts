import { repeat } from "lodash-es";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import {
  Border,
  IGridBlock,
  IGridConfig
} from "../../../../../common/__types__/IGridContainer";
import { IParams } from "../../../__types__/IParams";
import { gridBlock } from "../../../adapters/grid/grid-block";
import {
  ITopStoriesV2DefaultGridHandlerInput,
  TopStoriesV2DefaultGridPositions
} from "../../__types__/ITopStoriesV2DefaultGridHandlerInput";
import { handlerRunnerFunction } from "../../runner";

export default async function (
  handlerRunner: handlerRunnerFunction,
  { content }: ITopStoriesV2DefaultGridHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const mobile: { [key in TopStoriesV2DefaultGridPositions]: IGridBlock } = {
    [TopStoriesV2DefaultGridPositions.LeftHighlight]: gridBlock(1, 1, 1, 2, [
      Border.bottom
    ]),
    [TopStoriesV2DefaultGridPositions.RightHighlight]: gridBlock(2, 1, 1, 2, [
      Border.bottom
    ]),
    [TopStoriesV2DefaultGridPositions.BannerAd]: gridBlock(3, 1, 1, 2, []),
    [TopStoriesV2DefaultGridPositions.TopOne]: gridBlock(4, 1, 1, 1, [
      Border.bottom
    ]),
    [TopStoriesV2DefaultGridPositions.TopTwo]: gridBlock(4, 2, 1, 1, [
      Border.bottom
    ]),
    [TopStoriesV2DefaultGridPositions.TopThree]: gridBlock(5, 1, 1, 1, [
      Border.bottom
    ]),
    [TopStoriesV2DefaultGridPositions.TopFour]: gridBlock(5, 2, 1, 1, [
      Border.bottom
    ]),
    [TopStoriesV2DefaultGridPositions.MidInsert]: gridBlock(6, 1, 1, 2, [
      Border.bottom
    ]),
    [TopStoriesV2DefaultGridPositions.BottomOne]: gridBlock(7, 1, 1, 2, [
      Border.bottom
    ]),
    [TopStoriesV2DefaultGridPositions.BottomTwo]: gridBlock(8, 1, 1, 2, [
      Border.bottom
    ]),
    [TopStoriesV2DefaultGridPositions.BottomThree]: gridBlock(9, 1, 1, 2, [
      Border.bottom
    ]),
    [TopStoriesV2DefaultGridPositions.BottomFour]: gridBlock(10, 1, 1, 2, [
      Border.bottom
    ]),
    [TopStoriesV2DefaultGridPositions.BottomFive]: gridBlock(11, 1, 1, 2, [
      Border.bottom
    ]),
    [TopStoriesV2DefaultGridPositions.LowerRight]: gridBlock(12, 1, 1, 2, [])
  };

  const tablet: { [key in TopStoriesV2DefaultGridPositions]: IGridBlock } = {
    [TopStoriesV2DefaultGridPositions.LeftHighlight]: gridBlock(1, 1, 4, 2, [
      Border.bottom
    ]),
    [TopStoriesV2DefaultGridPositions.RightHighlight]: gridBlock(1, 3, 7, 1, [
      Border.bottom
    ]),
    [TopStoriesV2DefaultGridPositions.BannerAd]: gridBlock(8, 3, 7, 1, []),
    [TopStoriesV2DefaultGridPositions.TopOne]: gridBlock(5, 1, 4, 1, [
      Border.bottom
    ]),
    [TopStoriesV2DefaultGridPositions.TopTwo]: gridBlock(5, 2, 4, 1, [
      Border.bottom
    ]),
    [TopStoriesV2DefaultGridPositions.TopThree]: gridBlock(9, 1, 4, 1, [
      Border.bottom
    ]),
    [TopStoriesV2DefaultGridPositions.TopFour]: gridBlock(9, 2, 4, 1, [
      Border.bottom
    ]),
    [TopStoriesV2DefaultGridPositions.MidInsert]: gridBlock(13, 1, 1, 2, [
      Border.bottom
    ]),
    [TopStoriesV2DefaultGridPositions.BottomOne]: gridBlock(14, 1, 1, 2, [
      Border.bottom
    ]),
    [TopStoriesV2DefaultGridPositions.BottomTwo]: gridBlock(15, 1, 1, 2, [
      Border.bottom
    ]),
    [TopStoriesV2DefaultGridPositions.BottomThree]: gridBlock(16, 1, 1, 2, [
      Border.bottom
    ]),
    [TopStoriesV2DefaultGridPositions.BottomFour]: gridBlock(17, 1, 1, 2, [
      Border.bottom
    ]),
    [TopStoriesV2DefaultGridPositions.BottomFive]: gridBlock(18, 1, 1, 2, [
      Border.bottom
    ]),
    [TopStoriesV2DefaultGridPositions.LowerRight]: gridBlock(15, 3, 4, 1, [])
  };

  const desktop: IGridConfig = {
    gridTemplateColumns: "1fr 1fr 2fr 300px",
    gridTemplateRows: repeat(" auto", 8).substring(1),
    gridColumnGap: "20px",
    gridRowGap: "20px",
    gridBlocks: {
      [TopStoriesV2DefaultGridPositions.LeftHighlight]: gridBlock(1, 1, 1, 2, [
        Border.bottom
      ]),
      [TopStoriesV2DefaultGridPositions.RightHighlight]: gridBlock(
        1,
        3,
        2,
        1,
        []
      ),
      [TopStoriesV2DefaultGridPositions.BannerAd]: gridBlock(1, 4, 3, 1, []),
      [TopStoriesV2DefaultGridPositions.TopOne]: gridBlock(2, 1, 3, 1, [
        Border.bottom
      ]),
      [TopStoriesV2DefaultGridPositions.TopTwo]: gridBlock(2, 2, 3, 1, [
        Border.bottom
      ]),
      [TopStoriesV2DefaultGridPositions.TopThree]: gridBlock(3, 3, 1, 1, [
        Border.bottom
      ]),
      [TopStoriesV2DefaultGridPositions.TopFour]: gridBlock(4, 3, 1, 1, [
        Border.bottom
      ]),
      [TopStoriesV2DefaultGridPositions.MidInsert]: gridBlock(5, 1, 1, 3, [
        Border.bottom
      ]),
      [TopStoriesV2DefaultGridPositions.BottomOne]: gridBlock(6, 1, 3, 1, [
        Border.bottom
      ]),
      [TopStoriesV2DefaultGridPositions.BottomTwo]: gridBlock(6, 2, 3, 1, [
        Border.bottom
      ]),
      [TopStoriesV2DefaultGridPositions.BottomThree]: gridBlock(6, 3, 1, 1, [
        Border.bottom
      ]),
      [TopStoriesV2DefaultGridPositions.BottomFour]: gridBlock(7, 3, 1, 1, [
        Border.bottom
      ]),
      [TopStoriesV2DefaultGridPositions.BottomFive]: gridBlock(8, 3, 1, 1, [
        Border.bottom
      ]),
      [TopStoriesV2DefaultGridPositions.LowerRight]: gridBlock(4, 4, 5, 1, [])
    }
  };

  return [
    {
      type: ContentBlockType.GridContainer,
      items: content,
      mobile: {
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: repeat(" auto", 12).substring(1),
        gridColumnGap: "20px",
        gridRowGap: "20px",
        gridBlocks: mobile
      },
      tablet: {
        gridTemplateColumns: "1fr 1fr 2fr",
        gridTemplateRows: repeat(" auto", 18).substring(1),
        gridColumnGap: "20px",
        gridRowGap: "20px",
        gridBlocks: tablet
      },
      desktop
    }
  ];
}
