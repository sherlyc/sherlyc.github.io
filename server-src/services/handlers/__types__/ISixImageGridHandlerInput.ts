import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import { HandlerInputType } from "./HandlerInputType";

export interface ISixImageGridHandlerInput {
  type: HandlerInputType.SixImageGrid;
  content: { [key in SixImageGridHandlerPositions]: IContentBlock[] };
}

export enum SixImageGridHandlerPositions {
  ModuleTitle = "ModuleTitle",
  FirstRowLeft = "FirstRowLeft",
  FirstRowMiddle = "FirstRowMiddle",
  FirstRowRight = "FirstRowRight",
  SecondRowLeft = "SecondRowLeft",
  SecondRowMiddle = "SecondRowMiddle",
  SecondRowRight = "SecondRowRight",
  BigRight = "BigRight"
}
