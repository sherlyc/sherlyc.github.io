import { HandlerInput } from "./HandlerInput";
import { HandlerInputType } from "./HandlerInputType";

export interface IColumnHandlerInput {
  type: HandlerInputType.Column;
  content: HandlerInput[];
  columnGap?: number;
  rowGap?: number;
  border?: boolean;
}
