import { HandlerInputType } from "./HandlerInputType";
import { IContentBlock } from "../../../../common/__types__/IContentBlock";

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
