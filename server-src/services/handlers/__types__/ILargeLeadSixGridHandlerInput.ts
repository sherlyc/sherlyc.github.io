import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import { HandlerInputType } from "./HandlerInputType";

export interface ILargeLeadSixGridHandlerInput {
  type: HandlerInputType.LargeLeadSixGrid;
  content: { [position in LargeLeadSixGridPositions]: IContentBlock[] };
}

export enum LargeLeadSixGridPositions {
  ModuleTitle = "ModuleTitle",
  Left = "Left",
  Middle = "Middle",
  Right = "Right"
}
