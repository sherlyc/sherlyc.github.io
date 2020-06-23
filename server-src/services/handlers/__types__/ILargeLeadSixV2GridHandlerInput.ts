import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import { HandlerInputType } from "./HandlerInputType";

export interface ILargeLeadSixV2GridHandlerInput {
  type: HandlerInputType.LargeLeadSixV2Grid;
  content: { [position in LargeLeadSixV2GridPositions]: IContentBlock[] };
}

export enum LargeLeadSixV2GridPositions {
  ModuleTitle = "ModuleTitle",
  Left = "Left",
  MiddleOne = "MiddleOne",
  MiddleTwo = "MiddleTwo",
  MiddleThree = "MiddleThree",
  MiddleFour = "MiddleFour",
  Right = "Right"
}
