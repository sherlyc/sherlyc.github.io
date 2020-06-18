import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import { HandlerInputType } from "./HandlerInputType";

export interface ITopStoriesV2DefconGridHandlerInput {
  type: HandlerInputType.TopStoriesV2DefconGrid;
  content: { [position in TopStoriesV2DefconGridPositions]: IContentBlock[] };
}

export enum TopStoriesV2DefconGridPositions {
  Defcon = "Defcon",
  LeftOne = "LeftOne",
  LeftTwo = "LeftTwo",
  LeftThree = "LeftThree",
  LeftFour = "LeftFour",
  RightOne = "RightOne",
  RightTwo = "RightTwo",
  RightThree = "RightThree",
  RightFour = "RightFour",
  RightFive = "RightFive",
  RightSix = "RightSix",
  BannerAd = "BannerAd",
  MidInsert = "MidInsert",
  LowerRight = "LowerRight",
}
