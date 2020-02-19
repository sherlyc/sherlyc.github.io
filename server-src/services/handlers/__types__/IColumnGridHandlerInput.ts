import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import { HandlerInputType } from "./HandlerInputType";

export interface IColumnGridHandlerInput {
  type: HandlerInputType.ColumnGrid;
  content: IContentBlock[][];
  columnGap?: number;
  rowGap?: number;
  border?: boolean;
}
