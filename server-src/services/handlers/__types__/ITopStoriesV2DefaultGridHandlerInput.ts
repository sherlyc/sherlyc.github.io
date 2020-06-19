import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import { HandlerInputType } from "./HandlerInputType";

export interface ITopStoriesV2DefaultGridHandlerInput {
  type: HandlerInputType.TopStoriesV2DefaultGrid;
  content: { [position in TopStoriesV2DefaultGridPositions]: IContentBlock[] };
}

export enum TopStoriesV2DefaultGridPositions {
  LeftHighlight = "LeftHighlight",
  RightHighlight = "RightHighlight",
  TopOne = "TopOne",
  TopTwo = "TopTwo",
  TopThree = "TopThree",
  TopFour = "TopFour",
  MidInsert = "MidInsert",
  BottomOne = "BottomOne",
  BottomTwo = "BottomTwo",
  BottomThree = "BottomThree",
  BottomFour = "BottomFour",
  BottomFive = "BottomFive",
  BannerAd = "BannerAd",
  LowerRight = "LowerRight"
}
