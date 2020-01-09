import { HandlerInputType } from "./HandlerInputType";
import { IContentBlock } from "../../../../common/__types__/IContentBlock";

export interface IListGridHandlerInput {
  type: HandlerInputType.ListGrid;
  content: IContentBlock[];
}
