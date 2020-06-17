import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import { HandlerInputType } from "./HandlerInputType";

export interface IHalfFourGridHandlerInput {
  type: HandlerInputType.HalfFourGrid;
  content: { [position in HalfFourGridPositions]: IContentBlock[] };
}

export enum HalfFourGridPositions {
  ModuleTitle = "ModuleTitle",
  Left = "Left",
  RightOne = "RightOne",
  RightTwo = "RightTwo",
  RightThree = "RightThree"
}
