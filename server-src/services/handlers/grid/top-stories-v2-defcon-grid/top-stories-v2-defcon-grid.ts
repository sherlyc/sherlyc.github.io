import { repeat } from "lodash-es";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import {
  Border,
  IGridConfig
} from "../../../../../common/__types__/IGridContainer";
import { gridBlock } from "../../../adapters/grid/grid-block";
import { IParams } from "../../../__types__/IParams";
import { handlerRunnerFunction } from "../../runner";
import {
  ITopStoriesV2DefconGridHandlerInput,
  TopStoriesV2DefconGridPositions
} from "../../__types__/ITopStoriesV2DefconGridHandlerInput";

export default async function (
  handlerRunner: handlerRunnerFunction,
  { content }: ITopStoriesV2DefconGridHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const mobile: IGridConfig = {
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: repeat(" auto", 12).substring(1),
    gridColumnGap: "20px",
    gridRowGap: "20px",
    gridBlocks: {
      [TopStoriesV2DefconGridPositions.Defcon]: gridBlock(1, 1, 1, 2, []),
      [TopStoriesV2DefconGridPositions.BannerAd]: gridBlock(2, 1, 1, 2, []),
      [TopStoriesV2DefconGridPositions.TopOne]: gridBlock(3, 1, 1, 1, [
        Border.bottom
      ]),
      [TopStoriesV2DefconGridPositions.TopTwo]: gridBlock(3, 2, 1, 1, [
        Border.bottom
      ]),
      [TopStoriesV2DefconGridPositions.TopThree]: gridBlock(4, 1, 1, 2, [
        Border.bottom
      ]),
      [TopStoriesV2DefconGridPositions.TopFour]: gridBlock(5, 1, 1, 2, [
        Border.bottom
      ]),
      [TopStoriesV2DefconGridPositions.TopFive]: gridBlock(6, 1, 1, 2, [
        Border.bottom
      ]),
      [TopStoriesV2DefconGridPositions.MidInsert]: gridBlock(7, 1, 1, 2, []),
      [TopStoriesV2DefconGridPositions.BottomOne]: gridBlock(8, 1, 1, 1, [
        Border.bottom
      ]),
      [TopStoriesV2DefconGridPositions.BottomTwo]: gridBlock(8, 2, 1, 1, [
        Border.bottom
      ]),
      [TopStoriesV2DefconGridPositions.BottomThree]: gridBlock(9, 1, 1, 2, [
        Border.bottom
      ]),
      [TopStoriesV2DefconGridPositions.BottomFour]: gridBlock(10, 1, 1, 2, [
        Border.bottom
      ]),
      [TopStoriesV2DefconGridPositions.BottomFive]: gridBlock(11, 1, 1, 2, [
        Border.bottom
      ]),
      [TopStoriesV2DefconGridPositions.LowerRight]: gridBlock(12, 1, 1, 2, [])
    }
  };

  const tablet: IGridConfig = {
    gridTemplateColumns: "1fr 1fr 300px",
    gridTemplateRows: repeat(" auto", 10).substring(1),
    gridColumnGap: "20px",
    gridRowGap: "20px",
    gridBlocks: {
      [TopStoriesV2DefconGridPositions.Defcon]: gridBlock(1, 1, 1, 3, []),
      [TopStoriesV2DefconGridPositions.TopOne]: gridBlock(2, 1, 1, 1, [
        Border.bottom
      ]),
      [TopStoriesV2DefconGridPositions.TopTwo]: gridBlock(2, 2, 1, 1, [
        Border.bottom
      ]),
      [TopStoriesV2DefconGridPositions.TopThree]: gridBlock(3, 1, 1, 1, [
        Border.bottom
      ]),
      [TopStoriesV2DefconGridPositions.TopFour]: gridBlock(3, 2, 1, 1, [
        Border.bottom
      ]),
      [TopStoriesV2DefconGridPositions.MidInsert]: gridBlock(4, 1, 1, 2, []),
      [TopStoriesV2DefconGridPositions.TopFive]: gridBlock(5, 1, 1, 2, [
        Border.bottom
      ]),
      [TopStoriesV2DefconGridPositions.BottomOne]: gridBlock(6, 1, 1, 2, [
        Border.bottom
      ]),
      [TopStoriesV2DefconGridPositions.BottomTwo]: gridBlock(7, 1, 1, 2, [
        Border.bottom
      ]),
      [TopStoriesV2DefconGridPositions.BottomThree]: gridBlock(8, 1, 1, 2, [
        Border.bottom
      ]),
      [TopStoriesV2DefconGridPositions.BottomFour]: gridBlock(9, 1, 1, 2, [
        Border.bottom
      ]),
      [TopStoriesV2DefconGridPositions.BottomFive]: gridBlock(10, 1, 1, 2, [
        Border.bottom
      ]),
      [TopStoriesV2DefconGridPositions.BannerAd]: gridBlock(2, 3, 5, 1, []),
      [TopStoriesV2DefconGridPositions.LowerRight]: gridBlock(7, 3, 4, 1, [])
    }
  };

  const desktop: IGridConfig = {
    gridTemplateColumns: "1fr 1fr 2fr 300px",
    gridTemplateRows: repeat(" auto", 8).substring(1),
    gridColumnGap: "20px",
    gridRowGap: "40px",
    gridBlocks: {
      [TopStoriesV2DefconGridPositions.Defcon]: gridBlock(1, 1, 1, 3, []),
      [TopStoriesV2DefconGridPositions.TopOne]: gridBlock(2, 1, 3, 1, [
        Border.bottom
      ]),
      [TopStoriesV2DefconGridPositions.TopTwo]: gridBlock(2, 2, 3, 1, [
        Border.bottom
      ]),
      [TopStoriesV2DefconGridPositions.TopThree]: gridBlock(2, 3, 1, 1, [
        Border.bottom
      ]),
      [TopStoriesV2DefconGridPositions.TopFour]: gridBlock(3, 3, 1, 1, [
        Border.bottom
      ]),
      [TopStoriesV2DefconGridPositions.TopFive]: gridBlock(4, 3, 1, 1, [
        Border.bottom
      ]),
      [TopStoriesV2DefconGridPositions.BottomOne]: gridBlock(6, 1, 3, 1, [
        Border.bottom
      ]),
      [TopStoriesV2DefconGridPositions.BottomTwo]: gridBlock(6, 2, 3, 1, [
        Border.bottom
      ]),
      [TopStoriesV2DefconGridPositions.BottomThree]: gridBlock(6, 3, 1, 1, [
        Border.bottom
      ]),
      [TopStoriesV2DefconGridPositions.BottomFour]: gridBlock(7, 3, 1, 1, [
        Border.bottom
      ]),
      [TopStoriesV2DefconGridPositions.BottomFive]: gridBlock(8, 3, 1, 1, [
        Border.bottom
      ]),
      [TopStoriesV2DefconGridPositions.BannerAd]: gridBlock(1, 4, 3, 1, []),
      [TopStoriesV2DefconGridPositions.MidInsert]: gridBlock(5, 1, 1, 3, [
        Border.bottom
      ]),
      [TopStoriesV2DefconGridPositions.LowerRight]: gridBlock(4, 4, 5, 1, [])
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
