import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import { HandlerInputType } from "./HandlerInputType";

export interface IMostReadGridHandlerInput {
  type: HandlerInputType.MostReadGrid;
  content: { [position in MostReadGridPositions]: IContentBlock[] };
}

export enum MostReadGridPositions {
  Left = "Left",
  Right = "Right",
  Bottom = "Bottom"
}
