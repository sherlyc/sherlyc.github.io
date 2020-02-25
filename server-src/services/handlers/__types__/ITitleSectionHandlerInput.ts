import { HandlerInputType } from "./HandlerInputType";
import { HandlerInput } from "./HandlerInput";

export interface ITitleSectionHandlerInput {
  type: HandlerInputType.TitleSection;
  displayName: string;
  displayNameColor: string;
  linkUrl?: string;
  content: HandlerInput;
}
