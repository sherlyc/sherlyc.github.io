import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import { HandlerInputType } from "./HandlerInputType";

export interface IBrandGridHandlerInput {
  type: HandlerInputType.BrandGrid;
  content: { [key in BrandGridPositions]: IContentBlock[] };
}

export enum BrandGridPositions {
  ModuleTitle = "ModuleTitle",
  FirstRow = "FirstRow",
  SecondRow = "SecondRow"
}
