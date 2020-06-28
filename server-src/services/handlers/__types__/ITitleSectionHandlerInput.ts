import { AccentColor } from "../../../../common/__types__/AccentColor";
import { HandlerInput } from "./HandlerInput";
import { HandlerInputType } from "./HandlerInputType";

export interface ITitleSectionHandlerInput {
  type: HandlerInputType.TitleSection;
  displayName: string;
  displayNameColor: AccentColor;
  linkUrl?: string;
  content: HandlerInput;
}
