import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import { HandlerInputType } from "./HandlerInputType";

export interface IListGridHandlerInput {
  type: HandlerInputType.ListGrid;
  content: IContentBlock[];
}
