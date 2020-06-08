import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import { HandlerInputType } from "./HandlerInputType";

export interface IBiggieSmallsV2GridHandlerInput {
  type: HandlerInputType.BiggieSmallsV2Grid;
  content: { [position in BiggieSmallsV2GridPositions]: IContentBlock[] };
}

export enum BiggieSmallsV2GridPositions {
  ModuleTitle = "ModuleTitle",
  One = "One",
  Two = "Two",
  Three = "Three",
  Four = "Four",
  Five = "Five",
  Six = "Six",
  Seven = "Seven",
  Eight = "Eight",
  BannerAd = "BannerAd"
}
