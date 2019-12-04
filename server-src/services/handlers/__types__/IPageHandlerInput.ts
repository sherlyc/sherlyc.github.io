import { HandlerInput } from "./HandlerInput";
import { HandlerInputType } from "./HandlerInputType";

export interface IPageHandlerInput {
  type: HandlerInputType.Page;
  items: HandlerInput[];
}
