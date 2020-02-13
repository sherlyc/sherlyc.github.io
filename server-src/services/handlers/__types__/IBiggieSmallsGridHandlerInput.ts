import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import { HandlerInputType } from "./HandlerInputType";

export interface IBiggieSmallsGridHandlerInput {
  type: HandlerInputType.BiggieSmallsGrid;
  content: { [position in BiggieSmallsGridPositions]: IContentBlock[] };
}

export enum BiggieSmallsGridPositions {
  ModuleTitle = "ModuleTitle",
  Highlight = "Highlight",
  Right = "Right",
  FirstRow1 = "FirstRow1",
  FirstRow2 = "FirstRow2",
  FirstRow3 = "FirstRow3"
}
