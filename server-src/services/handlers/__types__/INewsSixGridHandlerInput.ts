import { HandlerInputType } from "./HandlerInputType";
import { IContentBlock } from "../../../../common/__types__/IContentBlock";

export enum NewsSixGridPositions {
  ModuleTitle = "ModuleTitle",
  BigTopLeft = "BigTopLeft",
  SmallTopRight = "SmallTopRight",
  SmallBottomFirst = "SmallBottomFirst",
  SmallBottomSecond = "SmallBottomSecond",
  SmallBottomThird = "SmallBottomThird",
  SmallBottomFourth = "SmallBottomFourth"
}

export interface INewsSixGridHandlerInput {
  type: HandlerInputType.NewsSixGrid;
  content: { [key in NewsSixGridPositions]: IContentBlock[] };
}
