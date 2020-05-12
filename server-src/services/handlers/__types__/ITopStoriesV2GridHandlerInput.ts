import { HandlerInputType } from "./HandlerInputType";
import { IContentBlock } from "../../../../common/__types__/IContentBlock";

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
  BannerAd = "BannerAd"
}
