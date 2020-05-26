import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import {
  Border,
  IGridBlocks
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
  const mobile: IGridBlocks = {
    [TopStoriesV2GridPositions.LeftHighlight]: gridBlock(1, 1, 1, 2, [
      Border.bottom
    ]),
    [TopStoriesV2GridPositions.RightHighlight]: gridBlock(2, 1, 1, 2, [
      Border.bottom
    ]),
    [TopStoriesV2GridPositions.BannerAd]: gridBlock(3, 1, 1, 2, []),
    [TopStoriesV2GridPositions.LeftOne]: gridBlock(4, 1, 1, 1, [Border.bottom]),
    [TopStoriesV2GridPositions.LeftTwo]: gridBlock(4, 2, 1, 1, [Border.bottom]),
    [TopStoriesV2GridPositions.LeftThree]: gridBlock(5, 1, 1, 1, [
      Border.bottom
    ]),
    [TopStoriesV2GridPositions.LeftFour]: gridBlock(5, 2, 1, 1, [
      Border.bottom
    ]),
    [TopStoriesV2GridPositions.RightOne]: gridBlock(6, 1, 1, 2, [
      Border.bottom
    ]),
    [TopStoriesV2GridPositions.RightTwo]: gridBlock(7, 1, 1, 2, [
      Border.bottom
    ]),
    [TopStoriesV2GridPositions.RightThree]: gridBlock(8, 1, 1, 2, [
      Border.bottom
    ]),
    [TopStoriesV2GridPositions.RightFour]: gridBlock(9, 1, 1, 2, [
      Border.bottom
    ])
  };

  const tablet: IGridBlocks = {
    [TopStoriesV2GridPositions.LeftHighlight]: gridBlock(1, 1, 4, 2, [
      Border.bottom
    ]),
    [TopStoriesV2GridPositions.RightHighlight]: gridBlock(1, 3, 7, 1, [
      Border.bottom
    ]),
    [TopStoriesV2GridPositions.BannerAd]: gridBlock(12, 1, 1, 3, []),
    [TopStoriesV2GridPositions.LeftOne]: gridBlock(5, 1, 4, 1, [Border.bottom]),
    [TopStoriesV2GridPositions.LeftTwo]: gridBlock(5, 2, 4, 1, [Border.bottom]),
    [TopStoriesV2GridPositions.LeftThree]: gridBlock(9, 1, 3, 1, [
      Border.bottom
    ]),
    [TopStoriesV2GridPositions.LeftFour]: gridBlock(9, 2, 3, 1, [
      Border.bottom
    ]),
    [TopStoriesV2GridPositions.RightOne]: gridBlock(8, 3, 1, 1, [
      Border.bottom
    ]),
    [TopStoriesV2GridPositions.RightTwo]: gridBlock(9, 3, 1, 1, [
      Border.bottom
    ]),
    [TopStoriesV2GridPositions.RightThree]: gridBlock(10, 3, 1, 1, [
      Border.bottom
    ]),
    [TopStoriesV2GridPositions.RightFour]: gridBlock(11, 3, 1, 1, [
      Border.bottom
    ])
  };

  const desktop: IGridBlocks = {
    [TopStoriesV2GridPositions.LeftHighlight]: gridBlock(1, 1, 4, 2, [
      Border.bottom
    ]),
    [TopStoriesV2GridPositions.RightHighlight]: gridBlock(1, 3, 7, 1, [
      Border.bottom
    ]),
    [TopStoriesV2GridPositions.BannerAd]: gridBlock(1, 4, 11, 1, []),
    [TopStoriesV2GridPositions.LeftOne]: gridBlock(5, 1, 4, 1, [Border.bottom]),
    [TopStoriesV2GridPositions.LeftTwo]: gridBlock(5, 2, 4, 1, [Border.bottom]),
    [TopStoriesV2GridPositions.LeftThree]: gridBlock(9, 1, 3, 1, [
      Border.bottom
    ]),
    [TopStoriesV2GridPositions.LeftFour]: gridBlock(9, 2, 3, 1, [
      Border.bottom
    ]),
    [TopStoriesV2GridPositions.RightOne]: gridBlock(8, 3, 1, 1, [
      Border.bottom
    ]),
    [TopStoriesV2GridPositions.RightTwo]: gridBlock(9, 3, 1, 1, [
      Border.bottom
    ]),
    [TopStoriesV2GridPositions.RightThree]: gridBlock(10, 3, 1, 1, [
      Border.bottom
    ]),
    [TopStoriesV2GridPositions.RightFour]: gridBlock(11, 3, 1, 1, [
      Border.bottom
    ])
  };

  return [
    {
      type: ContentBlockType.GridContainer,
      items: content,
      mobile: {
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "auto auto auto auto auto auto auto auto auto",
        gridColumnGap: "20px",
        gridRowGap: "20px",
        gridBlocks: mobile
      },
      tablet: {
        gridTemplateColumns: "1fr 1fr 2fr",
        gridTemplateRows:
          "auto auto auto auto auto auto auto auto auto auto auto auto",
        gridColumnGap: "20px",
        gridRowGap: "20px",
        gridBlocks: tablet
      },
      desktop: {
        gridTemplateColumns: "1fr 1fr 2fr 300px",
        gridTemplateRows:
          "auto auto auto auto auto auto auto auto auto auto auto",
        gridColumnGap: "20px",
        gridRowGap: "20px",
        gridBlocks: desktop
      }
    }
  ];
}