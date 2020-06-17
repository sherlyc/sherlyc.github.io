import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import { HandlerInputType } from "./HandlerInputType";

export interface IRelevantStoriesGridHandlerInput {
  type: HandlerInputType.RelevantStoriesGrid;
  content: { [key in RelevantStoriesGridPositions]: IContentBlock[] };
}

export enum RelevantStoriesGridPositions {
  FirstColumn = "FirstColumn",
  SecondColumn = "SecondColumn",
  ThirdColumn = "ThirdColumn",
  Right = "Right"
}
