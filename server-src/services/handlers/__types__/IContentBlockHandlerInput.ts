import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import { HandlerInputType } from "./HandlerInputType";

export interface IContentBlockHandlerInput {
  type: HandlerInputType.ContentBlockHandler;
  contentBlocks: IContentBlock[];
}
