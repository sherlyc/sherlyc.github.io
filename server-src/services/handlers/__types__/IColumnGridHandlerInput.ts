import { HandlerInputType } from "./HandlerInputType";
import { IContentBlock } from "../../../../common/__types__/IContentBlock";

export interface IColumnGridHandlerInput {
  type: HandlerInputType.ColumnGrid;
  content:  IContentBlock[][] ;
}

