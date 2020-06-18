import { HandlerInput } from "./HandlerInput";
import { HandlerInputType } from "./HandlerInputType";

export interface IBasicArticleSectionHandlerInput {
  type: HandlerInputType.ArticleSection;
  displayName: string;
  displayNameColor: string;
  linkUrl?: string;
  content: HandlerInput;
}
