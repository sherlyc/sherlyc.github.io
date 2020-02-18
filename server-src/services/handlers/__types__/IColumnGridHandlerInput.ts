import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import { IColumnGridConfigOptions } from "../grid/column-grid/__types__/IColumnGridConfig";
import { HandlerInputType } from "./HandlerInputType";

export interface IColumnGridHandlerInput {
  type: HandlerInputType.ColumnGrid;
  content: IContentBlock[][];
  options: IColumnGridConfigOptions;
}
