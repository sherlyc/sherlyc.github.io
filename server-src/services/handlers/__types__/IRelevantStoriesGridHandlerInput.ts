import { HandlerInputType } from "./HandlerInputType";
import { IContentBlock } from "../../../../common/__types__/IContentBlock";

export interface IRelevantStoriesGridHandlerInput {
  type: HandlerInputType.RelevantStoriesGrid;
  content: { [key in RelevantStoriesGridPositions]: IContentBlock[] };
}

export enum RelevantStoriesGridPositions {
  Left = "Left",
  Right = "Right"
}
