import { HandlerInputType } from "./HandlerInputType";
import { IContentBlock } from "../../../../common/__types__/IContentBlock";

export interface IContentBlockHandlerInput {
  type: HandlerInputType.ContentBlockHandler;
  contentBlocks: IContentBlock[];
}
