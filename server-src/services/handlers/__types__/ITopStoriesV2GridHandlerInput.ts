import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import { HandlerInputType } from "./HandlerInputType";

export interface ITopStoriesV2GridHandlerInput {
  type: HandlerInputType.TopStoriesV2Grid;
  content: { [position in TopStoriesV2GridPositions]: IContentBlock[] };
}

export enum TopStoriesV2GridPositions {
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
  MidInsert = "MidInsert"
}
