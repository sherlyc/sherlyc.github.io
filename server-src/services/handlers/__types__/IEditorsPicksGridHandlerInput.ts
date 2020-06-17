import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import { HandlerInputType } from "./HandlerInputType";

export interface IEditorsPicksGridHandlerInput {
  type: HandlerInputType.EditorsPicksGrid;
  content: { [position in EditorsPicksGridPositions]: IContentBlock[] };
}

export enum EditorsPicksGridPositions {
  ModuleTitle = "ModuleTitle",
  FirstRowOne = "FirstRowOne",
  FirstRowTwo = "FirstRowTwo",
  FirstRowThree = "FirstRowThree",
  FirstRowFour = "FirstRowFour",
  SecondRowOne = "SecondRowOne",
  SecondRowTwo = "SecondRowTwo",
  SecondRowThree = "SecondRowThree",
  SecondRowFour = "SecondRowFour",
  Ad = "Ad"
}
