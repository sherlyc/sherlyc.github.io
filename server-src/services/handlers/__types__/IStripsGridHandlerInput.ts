import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import { HandlerInputType } from "./HandlerInputType";

export interface IStripsGridHandlerInput {
  type: HandlerInputType.StripsGrid;
  content: { [position in StripsGridPositions]: IContentBlock[] };
}

export enum StripsGridPositions {
  ModuleTitle = "ModuleTitle",
  ModuleContent = "ModuleContent"
}
