import { repeat } from "lodash-es";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import {
  Border,
  IGridBlock
} from "../../../../../common/__types__/IGridContainer";
import { IParams } from "../../../__types__/IParams";
import { gridBlock } from "../../../adapters/grid/grid-block";
import {
  ITopStoriesV2GridHandlerInput,
  TopStoriesV2GridPositions
} from "../../__types__/ITopStoriesV2GridHandlerInput";
import { handlerRunnerFunction } from "../../runner";

export default async function(
  handlerRunner: handlerRunnerFunction,
  { content }: ITopStoriesV2GridHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const mobile: { [key in TopStoriesV2GridPositions]: IGridBlock } = {
    [TopStoriesV2GridPositions.LeftHighlight]: gridBlock(1, 1, 1, 2, [
      Border.bottom
    ]),
    [TopStoriesV2GridPositions.RightHighlight]: gridBlock(2, 1, 1, 2, [
      Border.bottom
    ]),
    [TopStoriesV2GridPositions.BannerAd]: gridBlock(3, 1, 1, 2, []),
    [TopStoriesV2GridPositions.LeftOne]: gridBlock(4, 1, 1, 1, [Border.bottom]),
    [TopStoriesV2GridPositions.LeftTwo]: gridBlock(4, 2, 1, 1, [Border.bottom]),
    [TopStoriesV2GridPositions.RightOne]: gridBlock(7, 1, 1, 2, [
      Border.bottom
    ]),
    [TopStoriesV2GridPositions.RightTwo]: gridBlock(8, 1, 1, 2, [
      Border.bottom
    ]),
    [TopStoriesV2GridPositions.LeftThree]: gridBlock(5, 1, 1, 1, [
      Border.bottom
    ]),
    [TopStoriesV2GridPositions.LeftFour]: gridBlock(5, 2, 1, 1, [
      Border.bottom
    ]),
    [TopStoriesV2GridPositions.RightThree]: gridBlock(9, 1, 1, 2, [
      Border.bottom
    ]),
    [TopStoriesV2GridPositions.RightFour]: gridBlock(10, 1, 1, 2, [
      Border.bottom
    ]),
    [TopStoriesV2GridPositions.RightFive]: gridBlock(11, 1, 1, 2, [
      Border.bottom
    ]),
    [TopStoriesV2GridPositions.MidInsert]: gridBlock(6, 1, 1, 2, [
      Border.bottom
    ]),
    [TopStoriesV2GridPositions.LowerRight]: gridBlock(12, 1, 1, 2, [])
  };

  const tablet: { [key in TopStoriesV2GridPositions]: IGridBlock } = {
    [TopStoriesV2GridPositions.LeftHighlight]: gridBlock(1, 1, 4, 2, [
      Border.bottom
    ]),
    [TopStoriesV2GridPositions.RightHighlight]: gridBlock(1, 3, 7, 1, [
      Border.bottom
    ]),
    [TopStoriesV2GridPositions.BannerAd]: gridBlock(8, 3, 7, 1, []),
    [TopStoriesV2GridPositions.LeftOne]: gridBlock(5, 1, 4, 1, [Border.bottom]),
    [TopStoriesV2GridPositions.LeftTwo]: gridBlock(5, 2, 4, 1, [Border.bottom]),
    [TopStoriesV2GridPositions.LeftThree]: gridBlock(9, 1, 4, 1, [
      Border.bottom
    ]),
    [TopStoriesV2GridPositions.LeftFour]: gridBlock(9, 2, 4, 1, [
      Border.bottom
    ]),
    [TopStoriesV2GridPositions.RightOne]: gridBlock(14, 1, 1, 2, [
      Border.bottom
    ]),
    [TopStoriesV2GridPositions.RightTwo]: gridBlock(15, 1, 1, 2, [
      Border.bottom
    ]),
    [TopStoriesV2GridPositions.RightThree]: gridBlock(16, 1, 1, 2, [
      Border.bottom
    ]),
    [TopStoriesV2GridPositions.RightFour]: gridBlock(17, 1, 1, 2, [
      Border.bottom
    ]),
    [TopStoriesV2GridPositions.RightFive]: gridBlock(18, 1, 1, 2, [
      Border.bottom
    ]),
    [TopStoriesV2GridPositions.MidInsert]: gridBlock(13, 1, 1, 2, [
      Border.bottom
    ]),
    [TopStoriesV2GridPositions.LowerRight]: gridBlock(15, 3, 4, 1, [])
  };

  const desktop: { [key in TopStoriesV2GridPositions]: IGridBlock } = {
    [TopStoriesV2GridPositions.LeftHighlight]: gridBlock(1, 1, 5, 2, [
      Border.bottom
    ]),
    [TopStoriesV2GridPositions.RightHighlight]: gridBlock(1, 3, 7, 1, [
      Border.bottom
    ]),
    [TopStoriesV2GridPositions.BannerAd]: gridBlock(1, 4, 8, 1, []),
    [TopStoriesV2GridPositions.LeftOne]: gridBlock(6, 1, 4, 1, [Border.bottom]),
    [TopStoriesV2GridPositions.LeftTwo]: gridBlock(6, 2, 4, 1, [Border.bottom]),
    [TopStoriesV2GridPositions.LeftThree]: gridBlock(11, 1, 3, 1, [
      Border.bottom
    ]),
    [TopStoriesV2GridPositions.LeftFour]: gridBlock(11, 2, 3, 1, [
      Border.bottom
    ]),
    [TopStoriesV2GridPositions.RightOne]: gridBlock(8, 3, 1, 1, [
      Border.bottom
    ]),
    [TopStoriesV2GridPositions.RightTwo]: gridBlock(9, 3, 1, 1, [
      Border.bottom
    ]),
    [TopStoriesV2GridPositions.MidInsert]: gridBlock(10, 1, 1, 3, []),
    [TopStoriesV2GridPositions.RightThree]: gridBlock(11, 3, 1, 1, [
      Border.bottom
    ]),
    [TopStoriesV2GridPositions.RightFour]: gridBlock(12, 3, 1, 1, [
      Border.bottom
    ]),
    [TopStoriesV2GridPositions.RightFive]: gridBlock(13, 3, 1, 1, [
      Border.bottom
    ]),
    [TopStoriesV2GridPositions.LowerRight]: gridBlock(9, 4, 5, 1, [])
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
      desktop: {
        gridTemplateColumns: "1fr 1fr 2fr 300px",
        gridTemplateRows: repeat(" auto", 13).substring(1),
        gridColumnGap: "20px",
        gridRowGap: "20px",
        gridBlocks: desktop
      }
    }
  ];
}
