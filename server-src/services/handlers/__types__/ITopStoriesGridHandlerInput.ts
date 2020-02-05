import { HandlerInputType } from "./HandlerInputType";
import { IContentBlock } from "../../../../common/__types__/IContentBlock";

export interface ITopStoriesGridHandlerInput {
  type: HandlerInputType.TopStoriesGrid;
  content: { [position in TopStoriesGridPositions]: IContentBlock[] };
}

export enum TopStoriesGridPositions {
  Highlight = "Highlight",
  Right = "Right",
  FirstRow1 = "FirstRow1",
  FirstRow2 = "FirstRow2",
  FirstRow3 = "FirstRow3",
  FirstRow4 = "FirstRow4",
  SecondRow1 = "SecondRow1",
  SecondRow2 = "SecondRow2",
  SecondRow3 = "SecondRow3",
  SecondRow4 = "SecondRow4"
}
