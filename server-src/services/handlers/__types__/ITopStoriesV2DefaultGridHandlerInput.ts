import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import { HandlerInputType } from "./HandlerInputType";

export interface ITopStoriesV2DefaultGridHandlerInput {
  type: HandlerInputType.TopStoriesV2DefaultGrid;
  content: { [position in TopStoriesV2DefaultGridPositions]: IContentBlock[] };
}

export enum TopStoriesV2DefaultGridPositions {
  LeftHighlight = "LeftHighlight",
  RightHighlight = "RightHighlight",
  LeftOne = "LeftOne",
  LeftTwo = "LeftTwo",
  LeftThree = "LeftThree",
  LeftFour = "LeftFour",
  RightOne = "RightOne",
  RightTwo = "RightTwo",
  RightThree = "RightThree",
  RightFour = "RightFour",
  RightFive = "RightFive",
  BannerAd = "BannerAd",
  LowerRight = "LowerRight",
  MidInsert = "MidInsert",
}
