import { HandlerInput } from "./HandlerInput";
import { HandlerInputType } from "./HandlerInputType";

export interface ITitleSectionHandlerInput {
  type: HandlerInputType.TitleSection;
  displayName: string;
  displayNameColor: string;
  linkUrl?: string;
  content: HandlerInput;
}
