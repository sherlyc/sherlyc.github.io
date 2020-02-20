import { HandlerInputType } from "./HandlerInputType";
import { IContentBlock } from "../../../../common/__types__/IContentBlock";

export interface IRelevantStoriesGridHandlerInput {
  type: HandlerInputType.RelevantStoriesGrid;
  content: { [key in RelevantStoriesGridPositions]: IContentBlock[] };
}

export enum RelevantStoriesGridPositions {
  FirstColumnTitle = "FirstColumnTitle",
  FirstColumnContent = "FirstColumnContent",
  SecondColumnTitle = "SecondColumnTitle",
  SecondColumnContent = "SecondColumnContent",
  ThirdColumnTitle = "ThirdColumnTitle",
  ThirdColumnContent = "ThirdColumnContent",
  Right = "Right"
}
