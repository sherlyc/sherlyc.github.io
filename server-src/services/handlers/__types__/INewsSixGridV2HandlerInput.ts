import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import { HandlerInputType } from "./HandlerInputType";

export enum NewsSixV2GridPositions {
  ModuleTitle = "ModuleTitle",
  TopLeft = "TopLeft",
  MidFirst = "MidFirst",
  MidSecond = "MidSecond",
  TopRight = "TopRight",
  BottomFirst = "BottomFirst",
  BottomSecond = "BottomSecond"
}

export interface INewsSixGridV2HandlerInput {
  type: HandlerInputType.NewsSixV2Grid;
  content: { [key in NewsSixV2GridPositions]: IContentBlock[] };
}
