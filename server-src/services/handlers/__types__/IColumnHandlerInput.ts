import { HandlerInputType } from "./HandlerInputType";
import { HandlerInput } from "./HandlerInput";

export interface IColumnHandlerInput {
  type: HandlerInputType.Column;
  content: HandlerInput[];
  columnGap?: number;
  rowGap?: number;
  border?: boolean;
}
