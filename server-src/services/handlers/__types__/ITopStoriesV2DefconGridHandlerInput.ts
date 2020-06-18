import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import { HandlerInputType } from "./HandlerInputType";

export interface ITopStoriesV2DefconGridHandlerInput {
  type: HandlerInputType.TopStoriesV2DefconGrid;
  content: { [position in TopStoriesV2DefconGridPositions]: IContentBlock[] };
}

export enum TopStoriesV2DefconGridPositions {
  Defcon = "Defcon",
  TopOne = "TopOne",
  TopTwo = "TopTwo",
  TopThree = "TopThree",
  TopFour = "TopFour",
  TopFive = "TopFive",
  BottomOne = "BottomOne",
  BottomTwo = "BottomTwo",
  BottomThree = "BottomThree",
  BottomFour = "BottomFour",
  BottomFive = "BottomFive",
  BannerAd = "BannerAd",
  MidInsert = "MidInsert",
  LowerRight = "LowerRight",
}
