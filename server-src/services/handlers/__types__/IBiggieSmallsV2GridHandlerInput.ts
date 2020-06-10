import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import { HandlerInputType } from "./HandlerInputType";

export interface IBiggieSmallsV2GridHandlerInput {
  type: HandlerInputType.BiggieSmallsV2Grid;
  content: { [position in BiggieSmallsV2GridPositions]: IContentBlock[] };
}

export enum BiggieSmallsV2GridPositions {
  ModuleTitle = "ModuleTitle",
  Highlight = "Highlight",
  RightOne = "RightOne",
  LeftOne = "LeftOne",
  LeftTwo = "LeftTwo",
  RightTwo = "RightTwo",
  RightThree = "RightThree",
  RightFour = "RightFour",
  RightFive = "RightFive",
  BannerAd = "BannerAd"
}
